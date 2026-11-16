/**
 * Host half of the Window Identifier bundle.
 *
 * Resolves this machine's identity once and publishes it into the pages this
 * Host serves, and exposes the same identity plus its editable settings on a
 * small HTTP endpoint that the Client half uses for the sidebar row and for the
 * settings page. Settings are persisted through the profile's `configEditor`
 * service, so the UI and `cordis.patch.yml` edit the same value.
 *
 * @module @local/machine-badge
 */
import os from 'node:os'

/** Named colors accepted by the `color` option; dark enough for white ink. */
const PALETTE = {
  red: '#b91c1c',
  orange: '#c2410c',
  amber: '#b45309',
  green: '#15803d',
  emerald: '#047857',
  teal: '#0f766e',
  cyan: '#0e7490',
  blue: '#1d4ed8',
  indigo: '#4338ca',
  violet: '#6d28d9',
  purple: '#7e22ce',
  pink: '#be185d',
  gray: '#4b5563',
  slate: '#475569',
}

/** Colors a machine without an explicit color maps onto, indexed by its hash. */
const AUTO_COLORS = [
  '#b91c1c',
  '#c2410c',
  '#b45309',
  '#15803d',
  '#1d4ed8',
  '#6d28d9',
  '#be185d',
  '#0f766e',
]

/** Glyph names the Client half can draw. */
export const GLYPHS = ['server', 'cloud', 'database', 'flask', 'bolt', 'home', 'box', 'pin']

/** Loader row id of this bundle's own plugin. */
const ROW_ID = 'machine-badge'

/** Package name of this bundle. */
const PACKAGE_NAME = '@local/machine-badge'

/** Route the Client half calls for settings and identity. */
export const ROUTE_PATH = '/machine-badge/api'

/** Boot global carrying the identity into the page. */
const GLOBAL_NAME = '__DSH_MACHINE_BADGE__'

/** Longest accepted label. */
const MAX_LABEL = 80

/** Longest accepted literal icon text (emoji or initials). */
const MAX_TEXT_ICON = 8

/** Largest accepted uploaded icon (raw bytes before base64). */
export const MAX_ICON_BYTES = 24 * 1024

/** Largest accepted settings request body; an icon data URL needs room. */
const BODY_LIMIT = 64 * 1024

/**
 * FNV-1a over the short hostname: an unconfigured machine keeps the same color
 * and glyph across restarts and versions.
 * @param text - seed text.
 * @returns unsigned 32-bit hash.
 */
function hash(text) {
  let value = 0x811c9dc5
  for (let index = 0; index < text.length; index += 1) {
    value ^= text.charCodeAt(index)
    value = Math.imul(value, 0x01000193)
  }
  return value >>> 0
}

/**
 * Normalize a color name or hex literal.
 * @param value - palette word or hex color.
 * @returns `#rrggbb`, or '' when the value is absent or unusable.
 */
function normalizeColor(value) {
  if (typeof value !== 'string') return ''
  const text = value.trim().toLowerCase()
  if (text === '') return ''
  const named = PALETTE[text]
  if (named !== undefined) return named
  const long = /^#([0-9a-f]{6})$/.exec(text)
  if (long !== null) return `#${long[1]}`
  const short = /^#([0-9a-f]{3})$/.exec(text)
  if (short !== null) return `#${[...short[1]].map((digit) => digit + digit).join('')}`
  return ''
}

/**
 * Validate an uploaded icon data URL.
 * Only SVG, PNG, JPEG and WebP are accepted; the value is re-encoded so the
 * stored form is canonical, and SVG content with active or external references
 * is rejected (the Client half renders it through an `<img>`, never inline).
 * @param value - candidate `data:` URL.
 * @returns canonical data URL, or the rejection message.
 */
function inspectIconImage(value) {
  const match = /^data:image\/(png|jpeg|webp|svg\+xml);base64,([A-Za-z0-9+/]+={0,2})$/.exec(value)
  if (match === null) {
    return { ok: false, error: 'icon image must be a base64 SVG, PNG, JPEG or WebP data URL' }
  }
  const bytes = Buffer.from(match[2], 'base64')
  if (bytes.length === 0) return { ok: false, error: 'icon image is empty' }
  if (bytes.length > MAX_ICON_BYTES) {
    return { ok: false, error: `icon image must be ${MAX_ICON_BYTES / 1024} KB or smaller` }
  }
  if (match[1] === 'svg+xml') {
    const text = bytes.toString('utf8')
    if (/<script|javascript:|<foreignObject|<!ENTITY|on[a-z]+\s*=|\bhref\s*=\s*["']https?:/i.test(text)) {
      return { ok: false, error: 'icon SVG contains active or external content' }
    }
  }
  return { ok: true, kind: 'image', value: `data:image/${match[1]};base64,${bytes.toString('base64')}` }
}

/**
 * Parse a configured icon.
 * @param value - configured icon value (absent means automatic).
 * @returns parsed icon with its kind, or the rejection message.
 */
function parseIcon(value) {
  if (value === undefined || value === null) return { ok: true, kind: 'auto', value: '' }
  if (typeof value !== 'string') return { ok: false, error: 'icon must be text' }
  const text = value.trim()
  if (text.startsWith('data:')) return inspectIconImage(text)
  const lowered = text.toLowerCase()
  if (text === '' || lowered === 'auto') return { ok: true, kind: 'auto', value: '' }
  if (lowered === 'none' || lowered === 'off') return { ok: true, kind: 'none', value: 'none' }
  if (GLYPHS.includes(lowered)) return { ok: true, kind: 'glyph', value: lowered }
  if (/\s/.test(text)) return { ok: false, error: 'icon text must be a single word or emoji' }
  if ([...text].length > MAX_TEXT_ICON) {
    return { ok: false, error: `icon text must be ${MAX_TEXT_ICON} characters or fewer` }
  }
  return { ok: true, kind: 'text', value: text }
}

/**
 * Resolve the configured icon to a built-in glyph, literal text, an uploaded
 * image, or nothing.
 * @param value - stored icon value.
 * @param seed - hostname hash used when the value is absent.
 * @returns plain JSON icon descriptor for the Client half.
 */
function resolveIcon(value, seed) {
  const parsed = parseIcon(value)
  if (!parsed.ok) return { kind: 'glyph', value: GLYPHS[seed % GLYPHS.length] }
  if (parsed.kind === 'auto') return { kind: 'glyph', value: GLYPHS[seed % GLYPHS.length] }
  if (parsed.kind === 'none') return { kind: 'none', value: '' }
  return { kind: parsed.kind, value: parsed.value }
}

/**
 * Read this process's user name without letting an unusual environment fail
 * plugin activation.
 * @returns user name, or '' when it cannot be read.
 */
function currentUser() {
  try {
    return os.userInfo().username
  } catch {
    return ''
  }
}

/**
 * Parse the row alignment of the icon and label pair.
 * @param value - configured alignment.
 * @returns `left` | `center` | `right`, or null when the value is unusable.
 */
export function parseAlign(value) {
  if (value === undefined || value === null || value === '') return 'left'
  if (typeof value !== 'string') return null
  const text = value.trim().toLowerCase()
  if (text === 'left' || text === 'start') return 'left'
  if (text === 'center' || text === 'centre' || text === 'middle') return 'center'
  if (text === 'right' || text === 'end') return 'right'
  return null
}

/**
 * Resolve the identity this Host publishes to its own pages.
 * @param config - raw row config from the profile patch.
 * @param environment - optional `{ hostname, user }` override for tests.
 * @returns plain JSON identity: label, color, icon, row colors, alignment, tooltip, machine facts.
 */
export function resolveIdentity(config = {}, environment) {
  const settings = config !== null && typeof config === 'object' ? config : {}
  const hostname = environment?.hostname ?? os.hostname()
  const user = environment?.user ?? currentUser()
  const shortName = hostname.split('.')[0] || hostname
  const configured = typeof settings.label === 'string' ? settings.label.trim() : ''
  const label = configured === '' ? shortName : configured
  const seed = hash(shortName)
  const color = normalizeColor(settings.color) || AUTO_COLORS[seed % AUTO_COLORS.length]
  const icon = resolveIcon(settings.icon, seed)
  const background = settings.background !== false
  const text = normalizeColor(settings.text)
  const align = parseAlign(settings.align) ?? 'left'
  const title = user === '' ? hostname : `${hostname} · ${user}`
  return { label, color, icon, background, text, align, title, machine: { hostname, user } }
}

/**
 * Validate one settings request.
 * @param body - parsed JSON request body.
 * @returns normalized settings, or the rejection message.
 */
export function validateSettings(body) {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, error: 'body must be a JSON object' }
  }
  const rawLabel = body.label === undefined || body.label === null ? '' : body.label
  if (typeof rawLabel !== 'string') return { ok: false, error: 'label must be text' }
  const label = rawLabel.trim()
  if (label.length > MAX_LABEL) return { ok: false, error: `label must be ${MAX_LABEL} characters or fewer` }

  const rawColor = body.color === undefined || body.color === null ? '' : body.color
  if (typeof rawColor !== 'string') return { ok: false, error: 'color must be text' }
  const color = normalizeColor(rawColor)
  if (rawColor.trim() !== '' && color === '') {
    return { ok: false, error: 'color must be a palette name or a #rgb/#rrggbb value' }
  }

  const icon = parseIcon(body.icon)
  if (!icon.ok) return icon

  const rawBackground = body.background
  if (rawBackground !== undefined && rawBackground !== null && typeof rawBackground !== 'boolean') {
    return { ok: false, error: 'background must be a boolean' }
  }

  const rawText = body.text === undefined || body.text === null ? '' : body.text
  if (typeof rawText !== 'string') return { ok: false, error: 'text must be text' }
  const text = normalizeColor(rawText)
  if (rawText.trim() !== '' && text === '') {
    return { ok: false, error: 'text must be a palette name or a #rgb/#rrggbb value' }
  }

  const align = parseAlign(body.align)
  if (align === null) return { ok: false, error: 'align must be left, center or right' }

  return {
    ok: true,
    value: {
      label,
      color,
      icon: icon.value,
      background: rawBackground !== false,
      text,
      align,
    },
  }
}

/**
 * Project a normalized settings object into the row config, keeping the patch
 * minimal: absent values mean "automatic".
 * @param settings - normalized settings.
 * @returns row config to persist.
 */
function toStoredConfig(settings) {
  const stored = {}
  if (settings.label !== '') stored.label = settings.label
  if (settings.color !== '') stored.color = settings.color
  if (settings.icon !== '') stored.icon = settings.icon
  if (settings.background === false) stored.background = false
  if (settings.text !== '') stored.text = settings.text
  if (settings.align !== 'left') stored.align = settings.align
  return stored
}

/**
 * Read the effective row config, preferring the live Loader entry so reads stay
 * correct whether or not the row was re-applied.
 * @param ctx - Host plugin context.
 * @param fallback - config captured at activation.
 * @returns effective raw config.
 */
function liveConfig(ctx, fallback) {
  const editor = ctx.get('configEditor')
  if (editor === undefined) return fallback
  try {
    const entries = editor.entries()
    const entry =
      entries.find((candidate) => candidate.options?.id === ROW_ID) ??
      entries.find((candidate) => candidate.options?.name === PACKAGE_NAME)
    const raw = entry?.options?.config
    return raw !== null && typeof raw === 'object' ? raw : {}
  } catch {
    return fallback
  }
}

/**
 * Read the effective settings as the Client form expects them.
 * @param config - effective raw config.
 * @returns flat settings object.
 */
function settingsOf(config) {
  const settings = config !== null && typeof config === 'object' ? config : {}
  return {
    label: typeof settings.label === 'string' ? settings.label.trim() : '',
    color: normalizeColor(settings.color),
    icon: (() => {
      const parsed = parseIcon(settings.icon)
      return parsed.ok ? parsed.value : ''
    })(),
    background: settings.background !== false,
    text: normalizeColor(settings.text),
    align: parseAlign(settings.align) ?? 'left',
  }
}

/**
 * Build the response both endpoints return.
 * @param ctx - Host plugin context.
 * @param config - effective raw config.
 * @returns response payload.
 */
export function payloadFor(ctx, config) {
  const identity = resolveIdentity(config)
  let writable = true
  try {
    writable = ctx.get('configEditor') !== undefined
  } catch {
    // A reconciling write may dispose this fiber mid-request; keep the page usable.
    writable = true
  }
  return {
    settings: settingsOf(config),
    identity,
    machine: identity.machine,
    writable,
  }
}

/**
 * Write a JSON response.
 * @param res - server response.
 * @param status - HTTP status code.
 * @param body - JSON-serializable body.
 */
function sendJson(res, status, body) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  res.end(JSON.stringify(body))
}

/**
 * Read a bounded request body.
 * @param req - incoming request.
 * @returns body text, or null when it exceeds the limit.
 */
function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    let settled = false
    const finish = (callback) => {
      if (settled) return
      settled = true
      callback()
    }
    req.on('data', (chunk) => {
      if (settled) return
      size += chunk.length
      if (size > BODY_LIMIT) {
        finish(() => resolve(null))
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => finish(() => resolve(Buffer.concat(chunks).toString('utf8'))))
    req.on('error', (error) => finish(() => reject(error)))
  })
}

/**
 * Serve the settings endpoint.
 * @param ctx - Host plugin context.
 * @param fallback - config captured at activation.
 * @param req - incoming request.
 * @param res - server response.
 */
async function handleRequest(ctx, fallback, req, res) {
  try {
    if (req.method === 'GET') {
      sendJson(res, 200, payloadFor(ctx, liveConfig(ctx, fallback)))
      return
    }
    if (req.method !== 'POST') {
      res.writeHead(405, { allow: 'GET, POST', 'cache-control': 'no-store' })
      res.end()
      return
    }
    const text = await readBody(req)
    if (text === null) {
      sendJson(res, 413, { error: 'request body is too large' })
      return
    }
    let parsed
    try {
      parsed = JSON.parse(text)
    } catch {
      sendJson(res, 400, { error: 'invalid JSON body' })
      return
    }
    const checked = validateSettings(parsed)
    if (!checked.ok) {
      sendJson(res, 400, { error: checked.error })
      return
    }
    const editor = ctx.get('configEditor')
    if (editor === undefined) {
      sendJson(res, 501, {
        error: 'host configuration editing is unavailable; edit this bundle cordis.patch.yml instead',
      })
      return
    }
    const entries = editor.entries()
    const entry =
      entries.find((candidate) => candidate.options?.id === ROW_ID) ??
      entries.find((candidate) => candidate.options?.name === PACKAGE_NAME)
    if (entry === undefined) {
      sendJson(res, 500, { error: 'the machine-badge row is not addressable in this profile' })
      return
    }
    const stored = toStoredConfig(checked.value)
    await editor.edit(entry, () => stored)
    sendJson(res, 200, payloadFor(ctx, stored))
  } catch (error) {
    try {
      sendJson(res, 500, { error: error instanceof Error ? error.message : String(error) })
    } catch {
      // Response already started; nothing left to report.
    }
  }
}

/**
 * Publish the identity into the page's boot HTML and serve the settings route.
 * @param ctx - Host plugin context.
 * @param config - validated row config.
 */
export function apply(ctx, config) {
  const fallback = config !== null && typeof config === 'object' ? config : {}
  ctx.on('webserver/index-inject', (table) => {
    table.push({
      kind: 'global',
      name: GLOBAL_NAME,
      value: resolveIdentity(liveConfig(ctx, fallback)),
    })
  })
  ctx.inject(['webServer'], (child) => {
    child.effect(() =>
      child.webServer.register({
        kind: 'exact',
        path: ROUTE_PATH,
        handler: (req, res) => {
          void handleRequest(ctx, fallback, req, res)
        },
      }),
    )
  })
}

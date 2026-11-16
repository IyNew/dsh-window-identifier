window.__ModuleLoader__.load({
  id: '@local/machine-badge',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    /** Locale namespace owned by this plugin. */
    const NS = 'machine-badge'

    /** Bundle package name; also the key the Plugins page dispatches. */
    const PACKAGE_NAME = '@local/machine-badge'

    /** Panel id: the sidebar row and the main panel it selects. */
    const PANEL_ID = 'machine-badge'

    /** Host route, resolved relative to the page so a reverse-proxy prefix survives. */
    const ROUTE = 'machine-badge/api'

    /** Colors offered as swatches; the Host accepts the same names. */
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

    /** Swatches shown in the settings page, in display order. */
    const SWATCHES = ['red', 'orange', 'amber', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink', 'gray']

    /** Built-in glyphs; names must match the Host's GLYPHS list. */
    const GLYPHS = {
      server: [
        ['rect', { x: 2.5, y: 2.8, width: 11, height: 4.4, rx: 1.2 }],
        ['rect', { x: 2.5, y: 8.8, width: 11, height: 4.4, rx: 1.2 }],
        ['circle', { cx: 4.9, cy: 5, r: 0.6, fill: 'currentColor', stroke: 'none' }],
        ['circle', { cx: 4.9, cy: 11, r: 0.6, fill: 'currentColor', stroke: 'none' }],
      ],
      cloud: [
        ['circle', { cx: 5.4, cy: 9.2, r: 2.2 }],
        ['circle', { cx: 8.4, cy: 7.4, r: 2.8 }],
        ['circle', { cx: 11.2, cy: 9.6, r: 1.7 }],
        ['path', { d: 'M4 12h8.2' }],
      ],
      database: [
        ['ellipse', { cx: 8, cy: 4.2, rx: 4.6, ry: 2 }],
        ['path', { d: 'M3.4 4.2v7.4c0 1.1 2.1 2 4.6 2s4.6-.9 4.6-2V4.2' }],
        ['path', { d: 'M3.4 7.9c0 1.1 2.1 2 4.6 2s4.6-.9 4.6-2' }],
      ],
      flask: [
        ['path', { d: 'M6.4 2.6h3.2' }],
        ['path', { d: 'M7 2.6v3.5L4.3 11a1.7 1.7 0 0 0 1.5 2.5h4.4A1.7 1.7 0 0 0 11.7 11L9 6.1V2.6' }],
        ['path', { d: 'M5.6 9.6h4.8' }],
      ],
      bolt: [['path', { d: 'M8.8 1.9 4.3 9.1h3l-.9 5 4.6-7.4h-3l.8-4.8z' }]],
      home: [
        ['path', { d: 'M2.9 7.3 8 2.6l5.1 4.7V13a.9.9 0 0 1-.9.9H3.8a.9.9 0 0 1-.9-.9z' }],
        ['path', { d: 'M6.4 13.9V9.6h3.2v4.3' }],
      ],
      box: [
        ['path', { d: 'M8 2.2 13 5v6L8 13.8 3 11V5z' }],
        ['path', { d: 'M3 5l5 2.8L13 5' }],
        ['path', { d: 'M8 7.8v6' }],
      ],
      pin: [
        ['path', { d: 'M8 13.8s4.2-4 4.2-6.9A4.2 4.2 0 0 0 3.8 6.9c0 2.9 4.2 6.9 4.2 6.9z' }],
        ['circle', { cx: 8, cy: 6.7, r: 1.6 }],
      ],
    }

    /** Glyph names in display order. */
    const GLYPH_NAMES = Object.keys(GLYPHS)

    /** English strings. */
    const en = {
      'panel.title': 'Window identifier',
      description:
        'Shows this machine as a row in the sidebar panel list. Settings are saved for this machine.',
      preview: 'Preview',
      'field.label': 'Text',
      'field.color': 'Color',
      'field.color.auto': 'Automatic',
      'field.color.hex': 'Custom color',
      'field.color.hexPlaceholder': '#rrggbb',
      'field.background': 'Row background',
      'field.background.solid': 'Colored',
      'field.background.transparent': 'Transparent',
      'field.text': 'Text color',
      'field.text.auto': 'Automatic',
      'field.align': 'Alignment',
      'align.left': 'Left',
      'align.center': 'Center',
      'align.right': 'Right',
      'field.icon': 'Icon',
      'field.icon.auto': 'Automatic',
      'field.icon.none': 'None',
      'field.icon.text': 'Custom text or emoji',
      'field.icon.upload': 'Upload icon…',
      'field.icon.remove': 'Remove image',
      'field.icon.hint': 'SVG, PNG, JPEG or WebP up to 24 KB',
      'glyph.server': 'Server',
      'glyph.cloud': 'Cloud',
      'glyph.database': 'Database',
      'glyph.flask': 'Flask',
      'glyph.bolt': 'Bolt',
      'glyph.home': 'Home',
      'glyph.box': 'Box',
      'glyph.pin': 'Pin',
      'action.save': 'Save',
      'action.reset': 'Reset',
      'status.loading': 'Reading the Host configuration…',
      'status.unavailable': 'The Host configuration is unavailable yet. Restart dsh once, then reload this page.',
      'status.readonly': 'This Host cannot persist settings. Edit this bundle cordis.patch.yml instead.',
      'status.saving': 'Saving…',
      'status.saved': 'Saved',
      'error.label': 'Text must be 80 characters or fewer.',
      'error.color': 'Use a palette color or #rgb / #rrggbb.',
      'error.icon': 'Icon text must be 8 characters or fewer, without spaces.',
      'error.iconSize': 'The image must be 24 KB or smaller.',
      'error.iconType': 'Use an SVG, PNG, JPEG or WebP file.',
      'error.iconRead': 'Could not read that file.',
    }

    /** Simplified Chinese strings. */
    const zh = {
      'panel.title': '窗口标识',
      description: '在左侧栏的面板列表中显示当前机器。设置按机器保存。',
      preview: '预览',
      'field.label': '文字',
      'field.color': '颜色',
      'field.color.auto': '自动',
      'field.color.hex': '自定义颜色',
      'field.color.hexPlaceholder': '#rrggbb',
      'field.background': '行背景',
      'field.background.solid': '彩色',
      'field.background.transparent': '透明',
      'field.text': '文字颜色',
      'field.text.auto': '自动',
      'field.align': '对齐',
      'align.left': '左对齐',
      'align.center': '居中',
      'align.right': '右对齐',
      'field.icon': '图标',
      'field.icon.auto': '自动',
      'field.icon.none': '无',
      'field.icon.text': '自定义文字或表情',
      'field.icon.upload': '上传图标…',
      'field.icon.remove': '移除图片',
      'field.icon.hint': '支持 SVG、PNG、JPEG、WebP，最大 24 KB',
      'glyph.server': '服务器',
      'glyph.cloud': '云',
      'glyph.database': '数据库',
      'glyph.flask': '烧瓶',
      'glyph.bolt': '闪电',
      'glyph.home': '房子',
      'glyph.box': '箱子',
      'glyph.pin': '图钉',
      'action.save': '保存',
      'action.reset': '恢复默认',
      'status.loading': '正在读取 Host 配置…',
      'status.unavailable': 'Host 配置暂不可用。请先重启 dsh，再刷新本页。',
      'status.readonly': '此 Host 无法保存设置，请编辑本插件的 cordis.patch.yml。',
      'status.saving': '正在保存…',
      'status.saved': '已保存',
      'error.label': '文字长度不能超过 80 个字符。',
      'error.color': '请使用调色板颜色或 #rgb / #rrggbb。',
      'error.icon': '图标文字不能超过 8 个字符，且不能包含空格。',
      'error.iconSize': '图片不能超过 24 KB。',
      'error.iconType': '请使用 SVG、PNG、JPEG 或 WebP 文件。',
      'error.iconRead': '无法读取该文件。',
    }

    /**
     * Resolve a palette word or hex literal.
     * @param value - color input.
     * @returns `#rrggbb`, or '' when unusable.
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
     * Choose readable ink for a background color (WCAG relative luminance).
     * @param color - `#rrggbb` background.
     * @returns `#111827` for light backgrounds, `#ffffff` otherwise.
     */
    function inkFor(color) {
      const match = /^#([0-9a-f]{6})$/i.exec(color)
      if (match === null) return '#ffffff'
      const value = Number.parseInt(match[1], 16)
      const channel = (byte) => {
        const ratio = byte / 255
        return ratio <= 0.03928 ? ratio / 12.92 : ((ratio + 0.055) / 1.055) ** 2.4
      }
      const luminance =
        0.2126 * channel((value >> 16) & 255) +
        0.7152 * channel((value >> 8) & 255) +
        0.0722 * channel(value & 255)
      return luminance > 0.45 ? '#111827' : '#ffffff'
    }

    /**
     * Darken a hex color by mixing it toward black.
     * @param color - `#rrggbb` color.
     * @param amount - 0..1 share of black.
     * @returns `#rrggbb` color.
     */
    function shade(color, amount) {
      const match = /^#([0-9a-f]{6})$/i.exec(color)
      if (match === null) return color
      const value = Number.parseInt(match[1], 16)
      const channel = (byte) => Math.max(0, Math.min(255, Math.round(byte * (1 - amount))))
      const red = channel((value >> 16) & 255)
      const green = channel((value >> 8) & 255)
      const blue = channel(value & 255)
      return `#${((red << 16) | (green << 8) | blue).toString(16).padStart(6, '0')}`
    }

    /**
     * Map the configured alignment onto a flex justification.
     * @param align - `left` | `center` | `right`.
     * @returns CSS `justify-content` value.
     */
    function alignToJustify(align) {
      if (align === 'center') return 'center'
      if (align === 'right') return 'flex-end'
      return 'flex-start'
    }

    /**
     * Resolve the row label color.
     * @param identity - render identity.
     * @returns CSS color, or '' to inherit the host's text color.
     */
    function rowTextOf(identity) {
      if (typeof identity.text === 'string' && /^#[0-9a-f]{6}$/i.test(identity.text)) return identity.text
      return identity.background === false ? '' : inkFor(identity.color)
    }

    /**
     * Stylesheet that paints the host-owned sidebar row containing our mark.
     * Selectors are scoped to buttons that contain `[data-machine-badge]`, and
     * the component that renders this removes it on unmount.
     * @param identity - render identity.
     * @returns CSS text.
     */
    function rowStyleCss(identity) {
      const justify = alignToJustify(identity.align)
      const text = rowTextOf(identity)
      const filled = identity.background !== false
      if (!filled) {
        const rules = [`button:has([data-machine-badge]){justify-content:${justify}}`]
        if (text !== '') {
          rules.push(`button:has([data-machine-badge]){color:${text}}`)
          rules.push(`button:has([data-machine-badge])[aria-current="page"]{color:${text}}`)
        }
        return rules.join('')
      }
      const fill = identity.color
      const ink = text === '' ? inkFor(fill) : text
      return [
        `button:has([data-machine-badge]){background:${fill};color:${ink};justify-content:${justify}}`,
        `button:has([data-machine-badge]):is(:hover,:focus-visible){background:${shade(fill, 0.08)};color:${ink}}`,
        `button:has([data-machine-badge])[aria-current="page"]{background:${shade(fill, 0.14)};color:${ink}}`,
      ].join('')
    }

    /**
     * Parse an icon draft into a renderable descriptor.
     * @param value - draft icon string.
     * @returns icon descriptor.
     */
    function parseIcon(value) {
      const text = typeof value === 'string' ? value.trim() : ''
      if (/^data:image\//.test(text)) return { kind: 'image', value: text }
      const lowered = text.toLowerCase()
      if (lowered === 'none' || lowered === 'off') return { kind: 'none', value: '' }
      if (GLYPH_NAMES.includes(lowered)) return { kind: 'glyph', value: lowered }
      return { kind: 'text', value: text }
    }

    /** Largest accepted uploaded icon (raw bytes); mirrors the Host limit. */
    const MAX_ICON_BYTES = 24 * 1024

    /** MIME types accepted for an uploaded icon. */
    const ICON_TYPES = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp']

    /**
     * Resolve the MIME type of an uploaded file, preferring its extension when
     * the browser reports no type.
     * @param file - picked File.
     * @returns accepted MIME type, or ''.
     */
    function mimeForFile(file) {
      if (ICON_TYPES.includes(file.type)) return file.type
      const name = typeof file.name === 'string' ? file.name.toLowerCase() : ''
      if (name.endsWith('.svg')) return 'image/svg+xml'
      if (name.endsWith('.png')) return 'image/png'
      if (name.endsWith('.jpg') || name.endsWith('.jpeg')) return 'image/jpeg'
      if (name.endsWith('.webp')) return 'image/webp'
      return ''
    }

    /**
     * Read an uploaded icon into a base64 data URL.
     * @param file - picked File.
     * @returns `{ value }` data URL, or `{ error }` key suffix for the caller.
     */
    async function readIconFile(file) {
      if (file.size > MAX_ICON_BYTES) return { error: 'iconSize' }
      const mime = mimeForFile(file)
      if (mime === '') return { error: 'iconType' }
      try {
        const bytes = new Uint8Array(await file.arrayBuffer())
        let binary = ''
        const chunk = 0x8000
        for (let index = 0; index < bytes.length; index += chunk) {
          binary += String.fromCharCode(...bytes.subarray(index, index + chunk))
        }
        return { value: `data:${mime};base64,${btoa(binary)}` }
      } catch {
        return { error: 'iconRead' }
      }
    }

    /**
     * Normalize an identity payload into the render shape.
     * @param raw - untrusted payload.
     * @returns identity with safe defaults.
     */
    function readIdentity(raw) {
      const fallbackHost = globalThis.location?.host ?? ''
      if (raw === null || typeof raw !== 'object') {
        return {
          label: fallbackHost === '' ? 'unknown host' : fallbackHost,
          color: '#4b5563',
          icon: { kind: 'glyph', value: 'pin' },
          background: true,
          text: '',
          align: 'left',
          title: fallbackHost,
          machine: { hostname: '', user: '' },
        }
      }
      const label =
        typeof raw.label === 'string' && raw.label.trim() !== '' ? raw.label.trim() : 'unknown host'
      const color =
        typeof raw.color === 'string' && /^#[0-9a-f]{6}$/i.test(raw.color) ? raw.color : '#4b5563'
      const icon =
        raw.icon !== null && typeof raw.icon === 'object' && typeof raw.icon.kind === 'string'
          ? { kind: raw.icon.kind, value: typeof raw.icon.value === 'string' ? raw.icon.value : '' }
          : { kind: 'glyph', value: 'pin' }
      const machine =
        raw.machine !== null && typeof raw.machine === 'object'
          ? {
              hostname: typeof raw.machine.hostname === 'string' ? raw.machine.hostname : '',
              user: typeof raw.machine.user === 'string' ? raw.machine.user : '',
            }
          : { hostname: '', user: '' }
      return {
        label,
        color,
        icon,
        background: raw.background !== false,
        text: typeof raw.text === 'string' && /^#[0-9a-f]{6}$/i.test(raw.text) ? raw.text : '',
        align: raw.align === 'center' || raw.align === 'right' ? raw.align : 'left',
        title: typeof raw.title === 'string' ? raw.title : '',
        machine,
      }
    }

    /**
     * Normalize the settings section of a payload.
     * @param raw - untrusted settings.
     * @returns settings draft with safe defaults.
     */
    function readSettings(raw) {
      const source = raw !== null && typeof raw === 'object' ? raw : {}
      return {
        label: typeof source.label === 'string' ? source.label : '',
        color: typeof source.color === 'string' ? source.color : '',
        icon: typeof source.icon === 'string' ? source.icon : '',
        background: source.background !== false,
        text: typeof source.text === 'string' ? source.text : '',
        align: source.align === 'center' || source.align === 'right' ? source.align : 'left',
      }
    }

    /**
     * Resolve the settings URL against the page's own base.
     * @returns fetchable URL.
     */
    function apiUrl() {
      try {
        return new URL(ROUTE, document.baseURI)
      } catch {
        return ROUTE
      }
    }

    /**
     * Short human message for a thrown value.
     * @param error - thrown value.
     * @returns message text.
     */
    function messageOf(error) {
      if (error instanceof Error && error.message !== '') return error.message
      return String(error)
    }

    // ------------------------------------------------------------------
    // Shared state: the sidebar row, the panel, and the settings page.
    // ------------------------------------------------------------------

    let state = {
      identity: readIdentity(globalThis.__DSH_MACHINE_BADGE__),
      settings: { label: '', color: '', icon: '', background: true, text: '', align: 'left' },
      machine: { hostname: '', user: '' },
      loadState: 'loading',
      loadError: null,
      writable: false,
      saving: false,
      saveError: null,
      savedAt: 0,
    }
    state.machine = state.identity.machine

    const listeners = new Set()

    /** @returns current immutable snapshot. */
    function getState() {
      return state
    }

    /**
     * Subscribe to snapshot replacement.
     * @param listener - callback.
     * @returns disposer.
     */
    function subscribe(listener) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    }

    /**
     * Replace part of the snapshot and notify subscribers.
     * @param patch - changed fields.
     */
    function setState(patch) {
      state = { ...state, ...patch }
      for (const listener of [...listeners]) listener()
    }

    /**
     * Fold a Host payload into the store.
     * @param data - parsed response body.
     */
    function absorb(data) {
      const identity = readIdentity(data?.identity ?? null)
      setState({
        identity,
        machine: data?.machine ?? identity.machine,
        settings: readSettings(data?.settings),
        writable: data?.writable === true,
        loadState: 'ready',
        loadError: null,
      })
    }

    /** Re-register the sidebar row so its projected label follows a save. */
    let republishRow = () => {}

    /** Read the Host configuration once at activation. */
    async function refresh() {
      try {
        const response = await fetch(apiUrl(), { headers: { accept: 'application/json' } })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        absorb(await response.json())
      } catch (error) {
        setState({ loadState: 'error', loadError: messageOf(error) })
      }
    }

    /**
     * Persist a settings draft.
     * @param draft - settings to save.
     * @returns whether the Host accepted the write.
     */
    async function save(draft) {
      setState({ saving: true, saveError: null })
      try {
        const response = await fetch(apiUrl(), {
          method: 'POST',
          headers: { 'content-type': 'application/json', accept: 'application/json' },
          body: JSON.stringify({
            label: draft.label,
            color: draft.color,
            icon: draft.icon,
            background: draft.background,
            text: draft.text,
            align: draft.align,
          }),
        })
        const data = await response.json().catch(() => null)
        if (!response.ok) throw new Error(data?.error ?? `HTTP ${response.status}`)
        absorb(data)
        setState({ saving: false, savedAt: Date.now() })
        republishRow()
        return true
      } catch (error) {
        setState({ saving: false, saveError: messageOf(error) })
        return false
      }
    }

    // ------------------------------------------------------------------
    // Rendering
    // ------------------------------------------------------------------

    /**
     * Store subscription for components.
     * @returns current snapshot, re-rendering on replacement.
     */
    function useStore() {
      const [snapshot, setSnapshot] = React.useState(getState)
      React.useEffect(() => subscribe(() => setSnapshot(getState())), [])
      return snapshot
    }

    /**
     * Draw one built-in glyph.
     * @param props - glyph name and pixel size.
     * @returns SVG element.
     */
    function Glyph({ name, size }) {
      const parts = GLYPHS[name] ?? GLYPHS.pin
      return h(
        'svg',
        {
          viewBox: '0 0 16 16',
          width: size,
          height: size,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': 'true',
          focusable: 'false',
          style: { display: 'block' },
        },
        parts.map((part, index) => h(part[0], { key: index, ...part[1] })),
      )
    }

    /**
     * The machine mark: a color chip with the icon, or (on a filled row) the
     * bare glyph in the row text color.
     * @param props - identity, pixel size, and `row` when it sits in the row.
     * @returns mark element.
     */
    function MachineMark({ identity, size, mode }) {
      const onRow = mode === 'row'
      const icon = identity.icon
      const isImage = icon.kind === 'image' && /^data:image\//.test(icon.value)
      const chip = !isImage && (!onRow || identity.background === false)
      const glyphColor = chip ? inkFor(identity.color) : rowTextOf(identity) || inkFor(identity.color)
      const glyphSize = Math.max(9, Math.round(size * 0.72))
      const content =
        icon.kind === 'none'
          ? null
          : isImage
            ? h('img', {
                src: icon.value,
                alt: '',
                width: size,
                height: size,
                style: { display: 'block', objectFit: 'contain' },
              })
            : icon.kind === 'text'
              ? h('span', { style: { fontSize: Math.max(8, Math.round(size * 0.5)), lineHeight: 1 } }, icon.value)
              : h(Glyph, { name: icon.value, size: glyphSize })
      return h(
        'span',
        {
          'data-machine-badge': true,
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            flex: 'none',
            width: size,
            height: size,
            borderRadius: Math.max(3, Math.round(size * 0.26)),
            background: chip ? identity.color : 'transparent',
            color: glyphColor,
          },
        },
        content,
      )
    }

    /**
     * Sidebar panel row glyph and the stylesheet that paints its row, both
     * following the live identity.
     * @param props - requested glyph size from the sidebar.
     * @returns mark element plus its stylesheet.
     */
    function MachineRowGlyph({ size }) {
      const snapshot = useStore()
      const identity = snapshot.identity
      return h(
        React.Fragment,
        null,
        h('style', { key: 'row-css' }, rowStyleCss(identity)),
        h(MachineMark, {
          key: 'mark',
          identity,
          size: typeof size === 'number' && size > 0 ? size : 16,
          mode: 'row',
        }),
      )
    }

    /**
     * One labelled form row.
     * @param props - caption and control.
     * @returns row element.
     */
    function Row({ caption, children }) {
      return h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: 6 } },
        h('span', { style: { color: 'var(--dsw-alias-label-secondary)', fontSize: 12 } }, caption),
        children,
      )
    }

    /** Base button style matching the host's controls. */
    const BUTTON = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      height: 26,
      minWidth: 26,
      padding: '0 8px',
      borderRadius: 6,
      border: '1px solid var(--dsw-alias-border-l1)',
      background: 'var(--dsw-alias-bg-layer-1)',
      color: 'var(--dsw-alias-label-primary)',
      cursor: 'pointer',
      font: 'inherit',
      fontSize: 12,
      lineHeight: '24px',
    }

    /** Selected-state button style. */
    const BUTTON_ACTIVE = {
      ...BUTTON,
      borderColor: 'var(--dsw-alias-brand-primary)',
      boxShadow: '0 0 0 1px var(--dsw-alias-brand-primary)',
    }

    /** Disabled-state opacity. */
    const DISABLED = { opacity: 0.5, cursor: 'default' }

    /** Shared text input style. */
    const INPUT = {
      boxSizing: 'border-box',
      height: 28,
      padding: '0 8px',
      borderRadius: 6,
      border: '1px solid var(--dsw-alias-border-l1)',
      background: 'var(--dsw-alias-bg-layer-1)',
      color: 'var(--dsw-alias-label-primary)',
      font: 'inherit',
      fontSize: 13,
    }

    /**
     * Draft snapshot of the settings section.
     * @param snapshot - store snapshot.
     * @returns form draft.
     */
    function draftFrom(snapshot) {
      return {
        label: snapshot.settings.label,
        color: snapshot.settings.color,
        icon: snapshot.settings.icon,
        background: snapshot.settings.background !== false,
        text: snapshot.settings.text,
        align: snapshot.settings.align,
      }
    }

    /**
     * Client-side validation before a save round trip.
     * @param draft - form draft.
     * @param t - translator.
     * @returns error message, or null.
     */
    function validateDraft(draft, t) {
      if (draft.label.trim().length > 80) return t('error.label')
      const color = draft.color.trim()
      if (color !== '' && normalizeColor(color) === '') return t('error.color')
      const text = draft.text.trim()
      if (text !== '' && normalizeColor(text) === '') return t('error.color')
      const icon = draft.icon.trim()
      if (icon !== '' && !icon.startsWith('data:')) {
        const lowered = icon.toLowerCase()
        const known = lowered === 'auto' || lowered === 'none' || lowered === 'off' || GLYPH_NAMES.includes(lowered)
        if (!known) {
          if (/\s/.test(icon)) return t('error.icon')
          if ([...icon].length > 8) return t('error.icon')
        }
      }
      return null
    }

    /**
     * Identity the draft will produce, using the current identity for the parts
     * that stay automatic.
     * @param snapshot - store snapshot.
     * @param draft - form draft.
     * @returns preview identity.
     */
    function previewIdentity(snapshot, draft) {
      const base = snapshot.identity
      const shortName = (snapshot.machine?.hostname ?? '').split('.')[0]
      const label = draft.label.trim() !== '' ? draft.label.trim() : shortName !== '' ? shortName : base.label
      const color = draft.color.trim() !== '' ? normalizeColor(draft.color) || base.color : base.color
      return {
        ...base,
        label,
        color,
        icon: draft.icon.trim() === '' ? base.icon : parseIcon(draft.icon),
        background: draft.background !== false,
        text: draft.text.trim() === '' ? '' : normalizeColor(draft.text) || '',
        align: draft.align === 'center' || draft.align === 'right' ? draft.align : 'left',
      }
    }

    /**
     * One color control: automatic, palette swatches, and a hex field.
     * @param props - value, change handler, labels, and whether edits are allowed.
     * @returns control element.
     */
    function ColorField({ value, onChange, editable, autoLabel, hexLabel, placeholder }) {
      const selected = normalizeColor(value)
      return h(
        'div',
        { style: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 } },
        h(
          'button',
          {
            type: 'button',
            disabled: !editable,
            onClick: () => onChange(''),
            style: { ...(value.trim() === '' ? BUTTON_ACTIVE : BUTTON), ...(editable ? {} : DISABLED) },
          },
          autoLabel,
        ),
        ...SWATCHES.map((name) =>
          h('button', {
            key: name,
            type: 'button',
            title: name,
            'aria-label': name,
            'aria-pressed': selected === PALETTE[name],
            disabled: !editable,
            onClick: () => onChange(PALETTE[name]),
            style: {
              width: 22,
              height: 22,
              padding: 0,
              borderRadius: 999,
              border:
                selected === PALETTE[name]
                  ? '2px solid var(--dsw-alias-label-primary)'
                  : '1px solid var(--dsw-alias-border-l1)',
              background: PALETTE[name],
              cursor: editable ? 'pointer' : 'default',
              opacity: editable ? 1 : 0.5,
            },
          }),
        ),
        h(
          'label',
          { style: { display: 'inline-flex', alignItems: 'center', gap: 6, marginLeft: 4 } },
          hexLabel === undefined
            ? null
            : h('span', { style: { color: 'var(--dsw-alias-label-secondary)', fontSize: 12 } }, hexLabel),
          h('input', {
            type: 'text',
            value,
            placeholder,
            disabled: !editable,
            onChange: (event) => onChange(event.target.value),
            style: { ...INPUT, width: 96 },
          }),
        ),
      )
    }

    /**
     * A mock of the sidebar row, using the shipped row geometry.
     * @param props - identity to render.
     * @returns row mock element.
     */
    function PreviewRow({ identity }) {
      const filled = identity.background !== false
      const text = rowTextOf(identity)
      return h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxSizing: 'border-box',
            minHeight: 36,
            width: 264,
            maxWidth: '100%',
            flex: '0 0 auto',
            margin: '0 2px',
            padding: '7px 8px',
            lineHeight: '22px',
            borderRadius: 'var(--dsw-radius-md)',
            background: filled ? identity.color : 'transparent',
            color: text === '' ? 'var(--dsw-alias-label-primary)' : text,
            justifyContent: alignToJustify(identity.align),
            fontSize: 14,
          },
        },
        h(MachineMark, { identity, size: 16, mode: 'row' }),
        h(
          'span',
          { style: { minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } },
          identity.label,
        ),
      )
    }

    /**
     * The editable settings block shared by the panel page and the plugin page.
     * @param props - translator and optional caption.
     * @returns form element.
     */
    function BadgeForm({ t, caption }) {
      const snapshot = useStore()
      const [draft, setDraft] = React.useState(() => draftFrom(snapshot))
      const [localError, setLocalError] = React.useState(null)

      React.useEffect(() => {
        setDraft(draftFrom(snapshot))
      }, [
        snapshot.settings.label,
        snapshot.settings.color,
        snapshot.settings.icon,
        snapshot.settings.background,
        snapshot.settings.text,
        snapshot.settings.align,
      ])

      const editable = snapshot.loadState === 'ready' && snapshot.writable
      const shortName = (snapshot.machine?.hostname ?? '').split('.')[0]
      const preview = previewIdentity(snapshot, draft)
      const iconDraft = draft.icon.trim()
      const isImage = /^data:image\//.test(iconDraft)
      const selectedIcon = iconDraft === '' ? 'auto' : isImage ? 'image' : iconDraft.toLowerCase()

      const update = (patch) => {
        setLocalError(null)
        setDraft((current) => ({ ...current, ...patch }))
      }

      const onPick = async (event) => {
        const input = event.target
        const file = input.files?.[0]
        input.value = ''
        if (!file) return
        const result = await readIconFile(file)
        if (result.error !== undefined) {
          setLocalError(t(`error.${result.error}`))
          return
        }
        update({ icon: result.value })
      }

      const submit = async () => {
        const problem = validateDraft(draft, t)
        if (problem !== null) {
          setLocalError(problem)
          return
        }
        await save(draft)
      }

      const reset = async () => {
        setLocalError(null)
        await save({ label: '', color: '', icon: '', background: true, text: '', align: 'left' })
      }

      const notice =
        snapshot.loadState === 'loading'
          ? t('status.loading')
          : snapshot.loadState === 'error'
            ? t('status.unavailable')
            : snapshot.writable
              ? null
              : t('status.readonly')

      const status = snapshot.saving
        ? t('status.saving')
        : snapshot.savedAt > 0
          ? t('status.saved')
          : null

      return h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 560 } },
        caption === undefined
          ? null
          : h('p', { style: { margin: 0, color: 'var(--dsw-alias-label-secondary)' } }, caption),
        h(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' } },
          h('span', { style: { color: 'var(--dsw-alias-label-secondary)', fontSize: 12 } }, t('preview')),
          h(PreviewRow, { identity: preview }),
        ),
        notice === null
          ? null
          : h(
              'p',
              { role: 'status', style: { margin: 0, color: 'var(--dsw-alias-label-secondary)', fontSize: 12 } },
              notice,
            ),
        h(
          Row,
          { caption: t('field.label') },
          h('input', {
            type: 'text',
            value: draft.label,
            placeholder: shortName === '' ? t('field.label') : shortName,
            maxLength: 80,
            disabled: !editable,
            onChange: (event) => update({ label: event.target.value }),
            style: { ...INPUT, width: '100%' },
          }),
        ),
        h(
          Row,
          { caption: t('field.color') },
          h(ColorField, {
            value: draft.color,
            onChange: (value) => update({ color: value }),
            editable,
            autoLabel: t('field.color.auto'),
            hexLabel: t('field.color.hex'),
            placeholder: t('field.color.hexPlaceholder'),
          }),
        ),
        h(
          Row,
          { caption: t('field.background') },
          h(
            'div',
            { style: { display: 'flex', gap: 6 } },
            h(
              'button',
              {
                type: 'button',
                disabled: !editable,
                onClick: () => update({ background: true }),
                style: {
                  ...(draft.background ? BUTTON_ACTIVE : BUTTON),
                  ...(editable ? {} : DISABLED),
                },
              },
              t('field.background.solid'),
            ),
            h(
              'button',
              {
                type: 'button',
                disabled: !editable,
                onClick: () => update({ background: false }),
                style: {
                  ...(!draft.background ? BUTTON_ACTIVE : BUTTON),
                  ...(editable ? {} : DISABLED),
                },
              },
              t('field.background.transparent'),
            ),
          ),
        ),
        h(
          Row,
          { caption: t('field.text') },
          h(ColorField, {
            value: draft.text,
            onChange: (value) => update({ text: value }),
            editable,
            autoLabel: t('field.text.auto'),
            placeholder: t('field.color.hexPlaceholder'),
          }),
        ),
        h(
          Row,
          { caption: t('field.align') },
          h(
            'div',
            { style: { display: 'flex', gap: 6 } },
            ...['left', 'center', 'right'].map((value) =>
              h(
                'button',
                {
                  key: value,
                  type: 'button',
                  disabled: !editable,
                  onClick: () => update({ align: value }),
                  style: {
                    ...(draft.align === value ? BUTTON_ACTIVE : BUTTON),
                    ...(editable ? {} : DISABLED),
                  },
                },
                t(`align.${value}`),
              ),
            ),
          ),
        ),
        h(
          Row,
          { caption: t('field.icon') },
          h(
            'div',
            { style: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 } },
            h(
              'button',
              {
                type: 'button',
                disabled: !editable,
                onClick: () => update({ icon: '' }),
                style: { ...(selectedIcon === 'auto' ? BUTTON_ACTIVE : BUTTON), ...(editable ? {} : DISABLED) },
              },
              t('field.icon.auto'),
            ),
            h(
              'button',
              {
                type: 'button',
                disabled: !editable,
                onClick: () => update({ icon: 'none' }),
                style: { ...(selectedIcon === 'none' ? BUTTON_ACTIVE : BUTTON), ...(editable ? {} : DISABLED) },
              },
              t('field.icon.none'),
            ),
            ...GLYPH_NAMES.map((name) =>
              h(
                'button',
                {
                  key: name,
                  type: 'button',
                  title: t(`glyph.${name}`),
                  'aria-label': t(`glyph.${name}`),
                  'aria-pressed': selectedIcon === name,
                  disabled: !editable,
                  onClick: () => update({ icon: name }),
                  style: { ...(selectedIcon === name ? BUTTON_ACTIVE : BUTTON), ...(editable ? {} : DISABLED) },
                },
                h(Glyph, { name, size: 14 }),
              ),
            ),
            h('input', {
              type: 'text',
              value:
                isImage || GLYPH_NAMES.includes(selectedIcon) || selectedIcon === 'auto' || selectedIcon === 'none'
                  ? ''
                  : draft.icon,
              placeholder: t('field.icon.text'),
              disabled: !editable,
              onChange: (event) => update({ icon: event.target.value }),
              style: { ...INPUT, width: 140 },
            }),
            h(
              'label',
              {
                style: {
                  ...BUTTON,
                  ...(editable ? {} : DISABLED),
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: editable ? 'pointer' : 'default',
                },
              },
              t('field.icon.upload'),
              h('input', {
                type: 'file',
                accept: 'image/svg+xml,image/png,image/jpeg,image/webp,.svg,.png,.jpg,.jpeg,.webp',
                disabled: !editable,
                onChange: (event) => void onPick(event),
                style: { position: 'absolute', inset: 0, opacity: 0, cursor: 'inherit' },
              }),
            ),
            isImage
              ? h(
                  'button',
                  {
                    type: 'button',
                    disabled: !editable,
                    onClick: () => update({ icon: '' }),
                    style: { ...BUTTON, ...(editable ? {} : DISABLED) },
                  },
                  t('field.icon.remove'),
                )
              : null,
          ),
          h(
            'span',
            { style: { color: 'var(--dsw-alias-label-secondary)', fontSize: 11 } },
            t('field.icon.hint'),
          ),
        ),
        h(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' } },
          h(
            'button',
            {
              type: 'button',
              disabled: !editable || snapshot.saving,
              onClick: () => void submit(),
              style: {
                ...BUTTON,
                ...(editable && !snapshot.saving ? {} : DISABLED),
                borderColor: 'var(--dsw-alias-brand-primary)',
              },
            },
            t('action.save'),
          ),
          h(
            'button',
            {
              type: 'button',
              disabled: !editable || snapshot.saving,
              onClick: () => void reset(),
              style: { ...BUTTON, ...(editable && !snapshot.saving ? {} : DISABLED) },
            },
            t('action.reset'),
          ),
          status === null
            ? null
            : h('span', { style: { color: 'var(--dsw-alias-label-secondary)', fontSize: 12 } }, status),
        ),
        localError === null && snapshot.saveError === null
          ? null
          : h(
              'p',
              { role: 'alert', style: { margin: 0, color: 'var(--dsw-alias-state-error-primary)', fontSize: 12 } },
              localError ?? snapshot.saveError,
            ),
      )
    }

    /**
     * The Main panel page selected by the sidebar row.
     * @param props - translator.
     * @returns page element.
     */
    function MachinePage(props) {
      const t = typeof props.t === 'function' ? props.t : (key) => key
      const snapshot = useStore()
      const identity = snapshot.identity
      return h(
        'div',
        {
          style: {
            display: 'flex',
            width: '100%',
            height: '100%',
            minWidth: 0,
            minHeight: 0,
            overflow: 'hidden',
            background: 'var(--dsw-alias-bg-base)',
            color: 'var(--dsw-alias-label-primary)',
            fontSize: 14,
            lineHeight: 1.6,
          },
        },
        h(
          'div',
          { style: { width: '100%', height: '100%', minHeight: 0, overflowY: 'auto', scrollbarGutter: 'stable' } },
          h(
            'div',
            { style: { maxWidth: 720, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px) 48px' } },
            h(
              'div',
              { style: { display: 'flex', alignItems: 'center', gap: 12, paddingTop: 28, marginBottom: 8, flexWrap: 'wrap' } },
              h(MachineMark, { identity, size: 28 }),
              h('h1', { style: { margin: 0, fontSize: 20, fontWeight: 600, lineHeight: 1.3 } }, identity.label),
            ),
            h(
              'p',
              { style: { margin: '0 0 20px', color: 'var(--dsw-alias-label-secondary)', fontSize: 13 } },
              identity.title,
            ),
            h(BadgeForm, { t }),
          ),
        ),
      )
    }

    /**
     * The bundle's configuration block on the Plugins page.
     * @param props - view kind and translator.
     * @returns form element, or null for the summary view.
     */
    function BadgeSettings(props) {
      const t = typeof props.t === 'function' ? props.t : (key) => key
      if (props.view === 'summary') return null
      return h(BadgeForm, { t, caption: t('description') })
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { en, zh }))
        void refresh()

        // Sidebar row in the panels group, plus the Main page it selects.
        ctx.slots.inject('sidebar.panellist', () => {
          let current
          const install = () => {
            current?.()
            current = ctx.slots.register(
              {
                name: 'sidebar.panellist',
                id: PANEL_ID,
                order: -10,
                locale: NS,
                label: () => getState().identity.label,
              },
              MachineRowGlyph,
            )
          }
          install()
          republishRow = install
          return () => {
            current?.()
            republishRow = () => {}
          }
        })

        ctx.slots.inject('main', () =>
          ctx.slots.register({ name: 'main', key: PANEL_ID, locale: NS }, MachinePage),
        )

        ctx.slots.inject('plugins.bundle.config', () =>
          ctx.slots.register({ name: 'plugins.bundle.config', key: PACKAGE_NAME, locale: NS }, BadgeSettings),
        )
      },
    }
  },
})

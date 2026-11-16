import assert from 'node:assert/strict'
import test from 'node:test'

import { MAX_ICON_BYTES, parseAlign, resolveIdentity, validateSettings } from '../index.js'

const env = { hostname: 'gpu-1.example.org', user: 'operator' }
const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7"/></svg>'
const svgUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`

test('defaults derive from the hostname', () => {
  const identity = resolveIdentity({}, env)
  assert.equal(identity.label, 'gpu-1')
  assert.equal(identity.align, 'left')
  assert.equal(identity.text, '')
  assert.equal(identity.background, true)
  assert.equal(identity.icon.kind, 'glyph')
  assert.equal(identity.title, 'gpu-1.example.org · operator')
  assert.deepEqual(identity.machine, env)
})

test('a label override keeps the hostname-seeded color and icon', () => {
  const base = resolveIdentity({}, env)
  const renamed = resolveIdentity({ label: 'gpu-node-3' }, env)
  assert.equal(renamed.label, 'gpu-node-3')
  assert.equal(renamed.color, base.color)
  assert.deepEqual(renamed.icon, base.icon)
})

test('palette and hex colors normalize; unknown colors fall back', () => {
  assert.equal(resolveIdentity({ color: 'teal' }, env).color, '#0f766e')
  assert.equal(resolveIdentity({ color: '#ABC' }, env).color, '#aabbcc')
  assert.equal(resolveIdentity({ color: 'chartreuse' }, env).color, resolveIdentity({}, env).color)
})

test('alignment aliases and fallbacks', () => {
  assert.equal(parseAlign('start'), 'left')
  assert.equal(parseAlign('middle'), 'center')
  assert.equal(parseAlign('END'), 'right')
  assert.equal(parseAlign('bogus'), null)
  assert.equal(parseAlign(undefined), 'left')
  assert.equal(resolveIdentity({ align: 'bogus' }, env).align, 'left')
})

test('text color and row background', () => {
  const identity = resolveIdentity({ text: 'red', background: false }, env)
  assert.equal(identity.text, '#b91c1c')
  assert.equal(identity.background, false)
})

test('settings validation accepts a complete object', () => {
  const checked = validateSettings({
    label: ' gpu ',
    color: 'teal',
    icon: 'bolt',
    background: false,
    text: '#fff',
    align: 'right',
  })
  assert.equal(checked.ok, true)
  assert.deepEqual(checked.value, {
    label: 'gpu',
    color: '#0f766e',
    icon: 'bolt',
    background: false,
    text: '#ffffff',
    align: 'right',
  })
})

test('settings validation rejects bad values', () => {
  const bodies = [
    { color: 'nope' },
    { text: 'nope' },
    { align: 'middle-ish' },
    { background: 'no' },
    { icon: 'two words' },
    { icon: '123456789' },
    { label: 'x'.repeat(81) },
  ]
  for (const body of bodies) {
    const checked = validateSettings(body)
    assert.equal(checked.ok, false, JSON.stringify(body))
    assert.equal(typeof checked.error, 'string')
  }
  assert.equal(validateSettings([]).ok, false)
  assert.equal(validateSettings(null).ok, false)
})

test('uploaded icons validate and resolve as images', () => {
  const checked = validateSettings({ icon: svgUrl })
  assert.equal(checked.ok, true)
  assert.equal(resolveIdentity(checked.value, env).icon.kind, 'image')

  const scripted = svgUrl.replace(
    Buffer.from(svg).toString('base64'),
    Buffer.from(svg.replace('<circle', '<script>alert(1)</script><circle')).toString('base64'),
  )
  assert.equal(validateSettings({ icon: scripted }).ok, false)
  assert.equal(validateSettings({ icon: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=' }).ok, false)
  assert.equal(
    validateSettings({ icon: `data:image/png;base64,${Buffer.alloc(MAX_ICON_BYTES + 1, 7).toString('base64')}` }).ok,
    false,
  )
})

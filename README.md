# Window Identifier

A small DSH Web UI plugin that shows **which machine** a DSH window belongs to.
It adds one row to the sidebar's panel list — above Plugins — with a configurable
color, icon and label, plus an identity page that edits those settings.

It is meant for people who keep several port-forwarded DSH windows open in one
browser.

```
[■] Quartz
Plugins
Schedules
```

The row uses the sidebar's own panel-row pattern, so it behaves like its
neighbours: full width with the icon and label when the sidebar is open, and a
36px icon button with a tooltip when the sidebar is folded to its rail. Clicking
it opens the identity page in the centre column.

- Repository: <https://github.com/IyNew/dsh-window-identifier>

The plugin is installed as the package named in `package.json` (currently
`@local/machine-badge` until the public package name is applied with a reinstall).

## How it gets its identity

The Host half resolves the identity when the profile boots and publishes it into
the page's boot HTML as `globalThis.__DSH_MACHINE_BADGE__` (the same channel the
shipped theme and shortcut plugins use for browser-side configuration). It also
serves `GET/POST /machine-badge/api`, which the Client half uses for the row, the
identity page, and the settings form. Nothing is fetched from another origin and
no secret is involved; the identity is page-visible, so do not put anything
sensitive in it.

## Defaults

| Field | Default |
|---|---|
| label | first label of `os.hostname()` (for example `h2`) |
| color | one of eight dark colors, chosen by an FNV-1a hash of the hostname |
| icon | one of eight glyphs, chosen by the same hash |
| row background | colored: the whole row is filled with `color`; transparent draws the glyph in the color |
| text color | automatic: contrast ink on a filled row, the host's text color on a transparent row |
| alignment | left (the icon and label move together) |
| tooltip / subtitle | `<full hostname> · <user>` |

The hash is seeded by the hostname, not the label, so renaming a machine does not
also change its color.

## Settings

Both the identity page (sidebar row) and
**Settings → Plugins → Window Identifier** edit the same values:

- **Text** — the row label and page title; empty means the short hostname.
- **Color** — automatic, a palette swatch, or a custom `#rgb` / `#rrggbb`.
- **Row background** — colored (fills the whole sidebar row with `color`), or
  transparent (the icon chip carries the color).
- **Text color** — automatic, or a palette/hex color for the row label; hover and
  selected states keep it.
- **Alignment** — left, center, or right, moving the icon and label together.
- **Icon** — automatic, none, one of eight glyphs, up to eight characters of your
  own text or emoji, or **Upload icon…** for an SVG, PNG, JPEG or WebP file up to
  24 KB. An uploaded image replaces the glyph, is drawn as-is (no color chip), and
  is stored inline as a base64 data URL in the profile override, so it travels
  with the machine's profile and needs no extra file. It is rendered through
  `<img>`, never inlined as markup; SVGs containing scripts, event handlers,
  entities, `<foreignObject>` or external `href`s are rejected. **Remove image**
  clears it.

The row is a shell-owned button, so the plugin paints it with a small stylesheet
scoped to `button:has([data-machine-badge])`; the folded rail stays the matching
36px icon button because the shell's own rail rule keeps it centered.

Save writes an id-targeted override into the **profile's `cordis.patch.yml`**
through the Host's `configEditor` service, which the profile reload watcher picks
up. The bundle's own `cordis.patch.yml` stays the inherited default, and **Reset**
removes the override again.

## Install

Install this package through the Harness plugin manager
(`install_bundle` with the absolute package directory, or the same spec from the
Plugins page). The profile links the checkout, so editing the files here is
editing the installed plugin.

The Client half hot-reloads when `client.js` changes (the bundle watcher
republishes it). The Host half (`index.js`) is **not** hot-reloaded: after
changing it, restart dsh once.

## Per-machine use

Each remote machine runs its own profile and serves its own pages, so the
injected identity is already per machine — no URL parameter is needed. If several
machines share one profile directory, leave the settings on automatic and let the
hostname defaults distinguish them; give a machine its own copy when its label
must be a specific name.

## Notes and limits

- Web only (`dsh.client.platform: web`). Without the Host route the row still
  renders from the boot payload and the settings form is read-only.
- The row is a panel-list entry, so it participates in main-panel navigation: the
  active row highlight follows it while the identity page is open.
- Concurrent edits from two browsers: the last save wins; there is no revision
  fence.
- The browser tab title is owned by the shell layout and cannot be extended by a
  plugin, so this row identifies the page, not the tab.

## Tests

```bash
npm test
```

runs the Host-half checks (`node --test`): identity resolution, settings
validation and the uploaded-icon rules. No dependencies are required.

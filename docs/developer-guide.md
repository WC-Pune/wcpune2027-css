# Developer guide

For anyone changing the SCSS. Setup and publishing are in the [README](../README.md); the reasons behind the odd rules are in [architecture.md](architecture.md).

## Contents
- [Classes the CSS relies on](#classes-the-css-relies-on)
- [Guidelines](#guidelines)
- [SCSS setup](#scss-setup)
- [Building a component](#building-a-component)
- [Local development](#local-development-live-site--local-css)
- [Troubleshooting](#troubleshooting)

## Classes the CSS relies on
The CSS only styles what the site already outputs, so some of it breaks if these change.

**Set in the editor** (block → Advanced → Additional CSS class). If one is removed or renamed
there, that part loses its styling.

| Class | Set on | Styles |
|---|---|---|
| `hero-wrap` | Homepage hero group | Clip-path, hover zoom, photo order and 4:3 photo on phones |
| `nav-cta` | A header menu item | Saffron pill button (full width in the phone menu) |
| `past-wc-nav` | The Past WordCamps menu in the footer | Pill-shaped link grid |

Component classes (`announce`, `ticket-card`, `info-card`, `error404-*`) are listed in the [editor guide](editor-guide.md#classes-you-can-add) and their markup is in [patterns.md](patterns.md).

**Added by WordPress, the theme or plugins** (not set by us). A plugin or theme update that
changes its markup can break the matching CSS without any change in this repo.

| Class | Comes from | Used for |
|---|---|---|
| `wcb_sponsor`, `type-wcb_sponsor`, `type-wcb_speaker`, `type-wcb_session`, `type-wcb_organizer` | WordCamp post types | Sponsor tiles; result-type labels in search |
| `page-slug-sponsors` | Page slug (body/post class) | 2-per-row sponsor logos on phones |
| `body.home`, `.search`, `.admin-bar` | WordPress body classes | Homepage spacing, search cards, sticky-header offset |
| `wp-block-jetpack-subscriptions__form-elements` | Jetpack Subscribe block | Footer subscribe form |
| `wp-social-link-*` | Social Icons block | Brand colours on hover |
| `wp-block-*`, `wp-element-button` | WordPress core blocks | Header, buttons, search, query loop |

## Guidelines
**Editor first, CSS last.** The CSS file only holds what the editor can't do (hover and focus
states, the sticky-header shadow, the phone menu, clip-paths, Jetpack workarounds). Before
adding a rule, check whether the editor can set it, and set it there.

1. **Colours: theme swatches only.** Pick a Theme palette slot in the editor, never a custom
   colour or a hex. In CSS, read the slot: `var(--wp--preset--color--accent-1)`. This way,
   re-colouring the site means changing a hex in Site Editor → Styles → Colours, and nothing
   else. The only hexes allowed in the CSS are the social networks' own brand colours (footer
   icons).
2. **Don't declare CSS variables** (`--name: value;`) or use `@import`. WordPress strips them
   (see [architecture.md](architecture.md#what-the-wordcamporg-sanitiser-does)). Reading `--wp--preset--…` variables is fine.
3. **Spacing and sizes use theme presets**, e.g. `var(--wp--preset--spacing--50)`. In the editor,
   choose the preset steps and not custom pixel values.
4. **Layout lives in the templates.** Content width (640px) and wide width (1280px) are set once
   in Site Editor → Styles → Layout. Don't set widths per template or per block.
   - *Page (with title)*: every page except the homepage. Post Content is Constrained, with
     the `50` step for left and right padding, 0 top and bottom, and the `30` step for block spacing.
   - *Page (no title)*: the homepage only. Full-width sections use the **Full width**
     alignment, so they ignore the content width.
5. **Don't touch Appearance → Additional CSS.** It stays empty. All CSS goes in the `scss/` partials
   (compiled into `wcpune2027.css`).
6. **Target classes, not positions.** Add a class in the block's Advanced → Additional CSS
   class and style that class. Avoid selectors tied to block order, such as `:nth-child`.
7. **`!important` only to beat WordPress.** WordPress marks block colour classes and the phone
   menu overlay `!important`. Use it only when you must override those, and add a comment saying why.
8. **Keep text readable.** Check contrast: never saffron text on white or sand; saffron buttons
   use charcoal text. Keep visible keyboard focus. Wrap motion in
   `@media (prefers-reduced-motion: no-preference)`.
9. **Mobile first check.** Test at 782px, 600px and 480px or narrower, and logged in (the admin bar
   moves the sticky header). Look at the phone menu overlay every time you touch the header.
    Breakpoints in use: **782px** (the admin bar grows to 46px; used in `_header.scss`), **781px** (WordPress stacks columns; used in `_hero.scss` so the photo moves above the text as the columns stack), **600px** and **480px**. The 1px gap between 781 and 782 is intentional, so don't align them.
10. **Keep it small and sectioned.** Put new rules in the matching partial (see [SCSS setup](#scss-setup))
    and comment *why*, not what. Delete rules once the editor does the same job.
11. **Don't hardcode content.** No page-specific text, IDs or URLs. Use block classes.
12. **Check after editor changes.** Template edits live in the database, not in this repo. After
    changing a template or Styles, re-check the page, and remove the CSS rule it replaces.

## SCSS setup
The CSS is written as SCSS partials and compiled into the single file the site loads. Splitting it
by area means several people can work at once without editing the same file.

```
scss/
├── main.scss                      # header comment + @use list (order = cascade order, don't reorder)
├── base/_links-buttons-inputs.scss
├── layout/_header.scss
├── components/_cards.scss         # sponsor + search card look
├── sections/_hero.scss
├── sections/_home.scss
├── pages/_search.scss
├── pages/_error404.scss           # 404 page (scoped to body.error404)
├── layout/_footer.scss
├── components/_announce.scss
├── components/_ticket-card.scss
├── components/_info-card.scss
└── pages/_blog.scss               # Updates post card grid (body.blog) + uncropped post images on archives
```

**Commands** (after the [Quick start](../README.md#quick-start) install):
- `npm run build` — compile `scss/main.scss` to `wcpune2027.css` once.
- `npm run watch` — recompile on every save while you work.
- `npm run check` — fails if `wcpune2027.css` doesn't match what the partials compile to. Run it
  before committing to catch a forgotten build (needs `diff`, so macOS/Linux; use WSL on Windows).

**Rules**
- Edit the partials in `scss/`, never `wcpune2027.css`; the next build overwrites it.
- Commit **both** the changed partials and the rebuilt `wcpune2027.css`. The site loads the built
  file straight from GitHub, so a stale build means a stale site.
- New rule? Put it in the matching partial and comment *why*. A new area gets a new partial plus a
  `@use` line in `main.scss`, placed where it should sit in the cascade.
- The sanitiser limits still apply to the compiled output. SCSS `$variables` are fine because they
  compile away, but a plain CSS `--custom-property: value;` or `@import` in a partial is stripped
  on the site.
- The built file uses spaces for indentation, not tabs.

## Building a component
Tick these in order. A component is done when every box is ticked (the same rule as [todo.md](todo.md)).

- [ ] Partial in `scss/components/` (or `scss/pages/` for a single page), using theme swatches and spacing presets only
- [ ] `@use` line in `scss/main.scss`, placed where it should sit in the cascade
- [ ] Add it to the numbered list in the `main.scss` header comment, with the next number
- [ ] Block markup and a row in the status table in [patterns.md](patterns.md)
- [ ] Paste it onto the password-protected test page; check desktop and 390px
- [ ] `npm run build` and `npm run check`, then sync and confirm the sanitiser kept `::before` and the other tricks you used
- [ ] Save it as a pattern in the Site Editor (Synced off, named exactly as in `patterns.md`)
- [ ] Add a row to the Ready-made patterns (and Classes) tables in the [editor guide](editor-guide.md)
- [ ] Move it to Done in [todo.md](todo.md)

## Local development (live site + local CSS)
1. Run two terminals from the repo folder: `npm run watch` (recompiles the SCSS on every save) and
   `python3 -m http.server 8027` (only serves `wcpune2027.css` to the browser; it does not compile).
2. Install the [Tampermonkey extension for Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en),
   then add `dev-inject.user.js` as a new script.
   (In `chrome://extensions` → Tampermonkey → Details, turn on **Allow User Scripts**.)
3. Open https://pune.wordcamp.org/2027/ — edit the SCSS, save, reload.
   Toggle the userscript off to compare with the current live site.

No-install alternative: paste the body of `dev-inject.user.js` into the DevTools console after each reload.

## Troubleshooting
- **`npm ci` fails:** check `node -v` is 18 or newer. If `package-lock.json` is out of step with
  `package.json`, run `npm install` once and commit the updated lock file.
- **`npm run check` shows a diff:** the build is stale. Run `npm run build` and commit `wcpune2027.css`.
- **Local CSS doesn't show on the live site:** make sure `python3 -m http.server 8027` is running
  from the repo folder, the Tampermonkey script is on, and **Allow User Scripts** is enabled.
- **Live site didn't update after merging to `main`:** check the webhook's **Recent Deliveries** for an error,
  or re-sync with **Appearance → Remote CSS → Update**, then view the served file to confirm your change is there.

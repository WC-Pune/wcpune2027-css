# WordCamp Pune 2027 — Remote CSS

`wcpune2027.css` is the custom stylesheet for pune.wordcamp.org/2027 (theme: Twenty Twenty-Five).
It is loaded on the site through **Appearance → Remote CSS** from the raw GitHub URL of
`WC-Pune/wcpune2027-css` (`main`). **Appearance → Additional CSS** is empty and should stay so.

| File | Purpose |
|---|---|
| [`scss/`](scss/) | **Source of truth.** SCSS partials, one per area (see [SCSS setup](#scss-setup)) |
| [`wcpune2027.css`](wcpune2027.css) | **Generated** from `scss/` and committed; this is the file Remote CSS loads. Don't edit it by hand |
| [`package.json`](package.json) | Sass scripts: `npm run build`, `watch` and `check` |
| [`docs/editor-guide.md`](docs/editor-guide.md) | For organizers: editing the site in WordPress, no code needed |
| [`docs/patterns.md`](docs/patterns.md) | Block markup for the components in `scss/components/` |
| [`docs/todo.md`](docs/todo.md) | Components and docs still to do |
| [`dev-inject.user.js`](dev-inject.user.js) | Dev only — preview local CSS on the live site |

## Quick start
Needs Node 18+ (`node -v`) and a clone of this repo.

1. `npm ci` — installs Sass at the versions in `package-lock.json` (once per clone).
2. Edit the relevant partial in `scss/`. Never edit `wcpune2027.css`; it is generated.
3. `npm run build` — compile to `wcpune2027.css`. Use `npm run watch` instead to recompile on every save.
4. `npm run check` — confirms `wcpune2027.css` matches the partials.
5. Commit the partials **and** `wcpune2027.css` together, on a branch.

**A push to `main` changes the live site within seconds**, so use a branch and a pull request.
To preview changes on the live site before merging, see [Local development](#local-development-live-site--local-css).

## Theme colours
Colours live in **Site Editor → Styles → Colours**; the CSS only reads them (see the
guidelines below). To re-colour the site, change the hex there.

| Slot | Used for | Live hex |
|---|---|---|
| Base | Page background; text on maroon | `#fbfaf3` |
| Contrast | Body text; text on buttons | `#3d362f` |
| Accent 1 | Maroon: brand, headings, links, footer | `#8f1402` |
| Accent 2 | Saffron: buttons, link underlines | `#f5a623` |
| Accent 3 | Unused | `#fbfaf3` |
| Accent 4 | Sand edge: borders | `#d6d5d3` |
| Accent 5 | Sand: hero, inputs, light panels | `#e1d9ca` |

The footer is maroon (Accent 1) with Base text, and buttons are saffron (Accent 2) with Contrast
text; the CSS sets these. Unused custom swatches (Brick red, Dark wooden, Timber, Light yellow,
Stone) can be deleted from the palette.

## ⚠️ Don't declare CSS variables
WordCamp's sanitiser **deletes every CSS custom property declaration** (`--anything: value;`)
and `@import`. Reading WordPress's own variables, like `var(--wp--preset--color--contrast)`,
is fine, and that is how this file gets every colour.

It also strips `animation-timeline` and `animation-range` (scroll-driven animations) but
keeps `animation:`, so a scroll animation would jump straight to its end state. Use hover
transitions instead. Checked against the served file on 2026-10-04; `:has()`, `@supports`,
`@keyframes`, `-webkit-line-clamp` and `content:` all survive.

## Classes the CSS relies on
The CSS only styles what the site already outputs, so some of it breaks if these change.

**Set in the editor** (block → Advanced → Additional CSS class). If one is removed or renamed
there, that part loses its styling.

| Class | Set on | Styles |
|---|---|---|
| `hero-wrap` | Homepage hero group | Clip-path, hover zoom, photo order and 4:3 photo on phones |
| `nav-cta` | A header menu item | Saffron pill button (full width in the phone menu) |
| `past-wc-nav` | The Past WordCamps menu in the footer | Pill-shaped link grid |

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

## Why the CSS does what it does
Short reasons, kept here so the CSS file stays comment-light.

- **Buttons stay in CSS.** Styles → Elements → Buttons has no text colour, and the Search and
  Jetpack Subscribe buttons are not Button blocks, so Blocks → Button doesn't reach them.
  WordPress marks block colour classes `!important`, hence `body …` with `!important`.
- **Inputs and placeholders.** Jetpack's subscribe form styles its placeholder with a stronger
  selector (`!important` needed). Logged in, Jetpack pre-fills and disables the email field and
  fades it to 50%, which turns it pink and unreadable on the maroon footer. Visitors never see this.
- **Link underline** (colour, thickness, offset) can't be set in the editor. Link text colour comes
  from Styles → Colours → Link.
- **Header.** The maroon top strip and thin bottom line are set in the editor (Border panel). The CSS
  only adds sticky behaviour, with offsets for the admin bar (32px, 46px under 783px, none under
  601px). The phone menu overlay needs `!important` because WordPress's overlay rules are very
  specific. Opening the menu focuses the first link, so menu links show a saffron underline instead
  of the focus box.
- **Header is compact, not shrinking.** Shrink-on-scroll needed `container-type: scroll-state` and
  `@container`, but the sanitiser strips `container-type` and breaks the `@container` block, so it
  never worked in Remote CSS. Don't add it back. The header stays sticky with fixed small padding and logo.
- **`nav-cta`** on a menu item makes it a saffron pill (full-width button in the phone menu).
  Use it for Contact now, Tickets later.
- **Sponsors.** WordPress forces each logo into a 16:9 box, which leaves wordmarks floating, so
  logos go in a 3:1 box with padding. The 2-per-row phone layout applies to the page with the slug `sponsors`.
- **Hero.** The clip-path, hover zoom, fading veil, caption box, photo order and 4:3 photo on phones
  can't be set in the editor. Everything static (chips, eyebrow, icons, radius, borders, padding)
  is.
- **Search results.** The Search Results template prints each result's full content, so the CSS
  trims it to a 3-line description and shows a small label for the result type. An Excerpt block in
  the template would be better than the Content block. Only the main (full-width) query is styled,
  not "More posts".
- **Footer.** The editor sets the footer sand with maroon text; the CSS makes it maroon with
  page-colour text. A maroon hover would vanish on maroon, so footer buttons use the page colour on
  hover. The logo PNG already includes its ring; the radius only clips its transparent corners.
  Social icons are plain; each network's own colour shows on hover, and those hexes are the
  networks' own, not our palette.
- **Scroll animations don't work** (see the sanitiser note above), so images zoom on hover instead.

## Guidelines for developers
**Editor first, CSS last.** The CSS file only holds what the editor can't do (hover and focus
states, the sticky-header shadow, the phone menu, clip-paths, Jetpack workarounds). Before
adding a rule, check whether the editor can set it, and set it there.

1. **Colours: theme swatches only.** Pick a Theme palette slot in the editor, never a custom
   colour or a hex. In CSS, read the slot: `var(--wp--preset--color--accent-1)`. This way,
   re-colouring the site means changing a hex in Site Editor → Styles → Colours, and nothing
   else. The only hexes allowed in the CSS are the social networks' own brand colours (footer
   icons).
2. **Don't declare CSS variables** (`--name: value;`) or use `@import`. WordPress strips them
   (see below). Reading `--wp--preset--…` variables is fine.
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
10. **Keep it small and sectioned.** Put new rules in the matching partial (see [SCSS setup](#scss-setup))
    and comment *why*, not what. Delete rules once the editor does the same job.
11. **Don't hardcode content.** No page-specific text, IDs or URLs. Use block classes.
12. **Check after editor changes.** Template edits live in the database, not in this repo. After
    changing a template or Styles, re-check the page, and remove the CSS rule it replaces.

## To do
- [ ] **Check by eye** on desktop and phone: footer search and Subscribe (heights, 10px gap,
  placeholder size), search results cards, the phone menu (divider under the last link, no focus box),
  the homepage hero and section spacing.
- [ ] **Sponsors page:** check the tile styling once the page is published (it returns 404 today).
- [ ] **Hero padding** is a fluid `clamp` in CSS; the editor only offers fixed steps. Move it only if that is acceptable.
- [ ] **Site title link rule** (`.wp-block-site-title a`) may be redundant now the colour is set in the editor. Remove it if the title looks the same without it.
- [ ] **Footer top space** is the `60` spacing step (70px) on every page. Check it by eye; use `50` or `70` in `scss/layout/_footer.scss` if it looks off.

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
└── layout/_footer.scss
```

**Commands** (after the [Quick start](#quick-start) install):
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

## Local development (live site + local CSS)
1. Run two terminals from the repo folder: `npm run watch` (recompiles the SCSS on every save) and
   `python3 -m http.server 8027` (only serves `wcpune2027.css` to the browser; it does not compile).
2. Install the [Tampermonkey extension for Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en),
   then add `dev-inject.user.js` as a new script.
   (In `chrome://extensions` → Tampermonkey → Details, turn on **Allow User Scripts**.)
3. Open https://pune.wordcamp.org/2027/ — edit the SCSS, save, reload.
   Toggle the userscript off to compare with the current live site.

No-install alternative: paste the body of `dev-inject.user.js` into the DevTools console after each reload.

## Publishing changes
1. Run `npm run build` and commit the rebuilt `wcpune2027.css` with your SCSS changes. `npm run check` confirms the two match.
2. Push to `origin` (`WC-Pune/wcpune2027-css`). A push to `main` goes live as soon as the site
   syncs it (webhook below, or the Update button), so review changes in a branch or pull request first.
3. The site doesn't read the file on each page load. WordCamp.org downloads it, sanitises and
   minifies it, and stores a local copy, which it re-syncs automatically through the webhook. If the
   webhook isn't working, go to wp-admin → **Appearance → Remote CSS** and click **Update**. Check the
   `ver=` number on `wordcamp_remote_css` in the page source goes up.

### Remote CSS URL and webhook
- WordCamp.org converts any GitHub URL you enter into the API form
  (`https://api.github.com/repos/WC-Pune/wcpune2027-css/contents/wcpune2027.css`). That is expected.
- Auto-sync webhook (repo Settings → Webhooks, admin account needed):
  - Payload URL: `https://pune.wordcamp.org/2027/wp-admin/admin-ajax.php?action=wcrcss_webhook`
  - Content type `application/x-www-form-urlencoded`, no secret, SSL verification on, **push** events only.
  - To test, push a change and check **Recent Deliveries** for a 200, then that `ver=` went up.
- Rules in the Core/Jetpack editor (Additional CSS, Site Editor styles) take precedence over Remote CSS.

## Troubleshooting
- **`npm ci` fails:** check `node -v` is 18 or newer. If `package-lock.json` is out of step with
  `package.json`, run `npm install` once and commit the updated lock file.
- **`npm run check` shows a diff:** the build is stale. Run `npm run build` and commit `wcpune2027.css`.
- **Local CSS doesn't show on the live site:** make sure `python3 -m http.server 8027` is running
  from the repo folder, the Tampermonkey script is on, and **Allow User Scripts** is enabled.
- **Live site didn't update after merging to `main`:** check the webhook's **Recent Deliveries** for an error,
  or re-sync with **Appearance → Remote CSS → Update**, then view the served file to confirm your change is there.

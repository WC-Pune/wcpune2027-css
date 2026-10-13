# WordCamp Pune 2027 — Remote CSS

`wcpune2027.css` is the custom stylesheet for pune.wordcamp.org/2027 (theme: Twenty Twenty-Five).
It is loaded on the site through **Appearance → Remote CSS** from the raw GitHub URL of
`WC-Pune/wcpune2027-css` (`main`). **Appearance → Additional CSS** is empty and should stay so.

## Start here
- Editing site content or using patterns in WordPress → [Editor guide](docs/editor-guide.md)
- Changing SCSS → [Developer guide](docs/developer-guide.md)
- Adding a reusable component → [Patterns](docs/patterns.md)
- Why the CSS does what it does, and what the sanitiser strips → [Architecture and constraints](docs/architecture.md)
- Checking unfinished work → [Todo](docs/todo.md)
- Previewing local CSS on the live site → [Local development](docs/developer-guide.md#local-development-live-site--local-css)

## Contents
- [Where to edit](#where-to-edit)
- [Quick start](#quick-start)
- [Before opening a pull request](#before-opening-a-pull-request)
- [Known limitations](#known-limitations)
- [Theme colours](#theme-colours)
- [Publishing changes](#publishing-changes)
- [Keeping the docs in step](#keeping-the-docs-in-step)

## Where to edit
| File | Purpose |
|---|---|
| [`scss/`](scss/) | **Source of truth.** SCSS partials, one per area (see [SCSS setup](docs/developer-guide.md#scss-setup)) |
| [`wcpune2027.css`](wcpune2027.css) | **Generated** from `scss/` and committed; this is the file Remote CSS loads. Don't edit it by hand |
| [`package.json`](package.json) | Sass scripts: `npm run build`, `watch` and `check` |
| [`docs/editor-guide.md`](docs/editor-guide.md) | For organizers: editing the site in WordPress, no code needed |
| [`docs/developer-guide.md`](docs/developer-guide.md) | Class lists, coding guidelines, SCSS layout, local preview, troubleshooting |
| [`docs/architecture.md`](docs/architecture.md) | Why the CSS is written the way it is; sanitiser limits |
| [`docs/patterns.md`](docs/patterns.md) | Block markup for the components in `scss/components/`, and their status |
| [`docs/todo.md`](docs/todo.md) | Components, checks and docs still to do |
| [`dev-inject.user.js`](dev-inject.user.js) | Dev only — preview local CSS on the live site |

## Quick start
Needs Node 18+ (`node -v`) and a clone of this repo.

1. `npm ci` — installs Sass at the versions in `package-lock.json` (once per clone).
2. Edit the relevant partial in `scss/`. Never edit `wcpune2027.css`; it is generated.
3. `npm run build` — compile to `wcpune2027.css`. Use `npm run watch` instead to recompile on every save.
4. `npm run check` — confirms `wcpune2027.css` matches the partials.
5. Commit the partials **and** `wcpune2027.css` together, on a branch.

**A push to `main` changes the live site within seconds**, so use a branch and a pull request.

## Before opening a pull request
- [ ] Edited files under `scss/`, not `wcpune2027.css`
- [ ] Ran `npm run build`
- [ ] Ran `npm run check`
- [ ] Checked desktop and 390px mobile layouts
- [ ] Checked the header and the phone menu
- [ ] Checked reduced-motion behaviour where relevant
- [ ] Committed both the SCSS and the generated CSS
- [ ] Updated the docs that go with the change (see [Keeping the docs in step](#keeping-the-docs-in-step))

## Known limitations
Details and reasons are in [architecture.md](docs/architecture.md).
- CSS custom property declarations (`--x: value;`) are removed. Reading `--wp--preset--…` is fine.
- `@import` is removed.
- Scroll-driven animation properties (`animation-timeline`, `animation-range`) are removed; use hover transitions.
- `container-type` is removed, so the shrinking header can't work.
- Rules from the editor (Additional CSS, Site Editor styles) override Remote CSS.
- Templates and Site Editor styles are saved in WordPress, not in this repo.

## Theme colours
Colours live in **Site Editor → Styles → Colours**; the CSS only reads them (see the
[guidelines](docs/developer-guide.md#guidelines)). To re-colour the site, change the hex there.

| Slot | Used for | Live hex |
|---|---|---|
| Base | Page background; text on maroon | `#fbfaf3` |
| Contrast | Body text; text on buttons | `#3d362f` |
| Accent 1 | Maroon: brand, headings, links, footer | `#8f1402` |
| Accent 2 | Saffron: buttons, link underlines | `#f5a623` |
| Accent 3 | Not used by this CSS. The Site Editor may use it for the header/hero background, so check Styles before changing it (to confirm) | `#fbfaf3` |
| Accent 4 | Sand edge: borders | `#d6d5d3` |
| Accent 5 | Sand: hero, inputs, light panels | `#e1d9ca` |

The footer is maroon (Accent 1) with Base text, and buttons are saffron (Accent 2) with Contrast
text; the CSS sets these. Unused custom swatches (Brick red, Dark wooden, Timber, Light yellow,
Stone) can be deleted from the palette.

## Publishing changes
Flow: **feature branch → pull request → review → merge to `main` → Remote CSS sync → verify on the live site.**

1. Run `npm run build` and commit the rebuilt `wcpune2027.css` with your SCSS changes. `npm run check` confirms the two match.
2. Push your branch to `origin` (`WC-Pune/wcpune2027-css`) and open a pull request. Don't push straight to `main`.
3. After review, merge to `main`. This goes live as soon as the site syncs it (webhook below, or the Update button).
4. Verify: the site doesn't read the file on each page load. WordCamp.org downloads it, sanitises and
   minifies it, and stores a local copy. If the webhook isn't working, go to wp-admin →
   **Appearance → Remote CSS** and click **Update**. Check the `ver=` number on `wordcamp_remote_css`
   in the page source goes up.

**Who can do what:**
- Merge to `main`: anyone with write access to the WC-Pune org repo (collaborators are managed by the org admin).
- Update Remote CSS by hand: a wp-admin user who can open Appearance on the site.
- Manage the webhook or collaborators: a repo admin only.

### Remote CSS URL and webhook
- WordCamp.org converts any GitHub URL you enter into the API form
  (`https://api.github.com/repos/WC-Pune/wcpune2027-css/contents/wcpune2027.css`). That is expected.
- Auto-sync webhook (repo Settings → Webhooks, admin account needed):
  - Payload URL: `https://pune.wordcamp.org/2027/wp-admin/admin-ajax.php?action=wcrcss_webhook`
  - Content type `application/x-www-form-urlencoded`, no secret, SSL verification on, **push** events only.
  - To test, push a change and check **Recent Deliveries** for a 200, then that `ver=` went up.
- Rules in the Core/Jetpack editor (Additional CSS, Site Editor styles) take precedence over Remote CSS.

## Keeping the docs in step
| When you… | Update |
|---|---|
| Add a component | SCSS partial in `scss/components/`, `@use` in `main.scss`, markup and status row in `docs/patterns.md`, a row in the editor guide, and `docs/todo.md` |
| Add or rename a class | The class table in the developer guide and in the editor guide |
| Add a WordPress workflow or setting | `docs/editor-guide.md` |
| Change build or publishing behaviour | This README |
| Learn a new sanitiser or WordPress limit | `docs/architecture.md` and the Known limitations list above |
| Leave work unfinished | `docs/todo.md` |

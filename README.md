# WordCamp Pune 2027 — Remote CSS

`wcpune2027.css` is the custom stylesheet for pune.wordcamp.org/2027 (theme: Twenty Twenty-Five).
Remote CSS is not switched on yet (waiting on team approval). Until then, only **Part A** of the
file (layout fixes, no colours) is pasted into **Appearance → Additional CSS**.

| File | Purpose |
|---|---|
| `wcpune2027.css` | Site CSS. Part A = layout (Additional CSS now). Part B = brand styling (Remote CSS later) |
| `dev-switch-palette.css` | Dev only — the switch-day Theme hexes, for previewing |
| `dev-inject.user.js` | Dev only — preview the palette + local CSS on the live site |
| `legacy-additional-css.css` | Backup of the old Additional CSS, for rollback |

## Colours live in the editor
Every colour is a **Theme** palette slot in **Site Editor → Styles → Colours**. Blocks use those
slots, and the stylesheet only reads them (`var(--wp--preset--color--accent-1)`), so
**the CSS contains no hex values**. To change the look, edit hexes in the editor.

| Theme slot | Used for | Today (live) | Switch day |
|---|---|---|---|
| Base | Page background; text on maroon | `#fbfaf3` | `#FFFFFF` |
| Contrast | Body text; text on buttons | `#3d362f` | `#1A202C` |
| Accent 1 | Maroon: brand, headings, links, footer text today / footer background later | `#8f1402` | `#8E1616` |
| Accent 2 | Saffron: buttons, link underlines (CSS) | `#F5A623` (unused today) | `#F5A623` |
| Accent 3 | Header and hero background | `#e1a48e` | `#F7F5F0` |
| Accent 4 | Sand edge: borders on sand (CSS) | `#D6D5D3` (unused today) | `#D6D5D3` |
| Accent 5 | Sand: footer background today, inputs, light panels | `#e1d9ca` | `#F7F5F0` |
| Brick red (custom) | Same as Accent 1; older blocks use it | `#8f1402` | `#8E1616` |

Part B of the CSS moves a few areas to a different slot, so switch day needs no block
re-colouring: footer → Accent 1 with Base text, buttons → Accent 2 with Contrast text,
header → Base.

When you re-colour a block, pick a Theme slot rather than Brick red; once nothing uses
Brick red (or the unused Dark wooden / Timber / Light yellow / Stone swatches) they can be deleted.

Text pairings for the brand palette: never saffron text on white or sand (2:1). Saffron buttons
use charcoal text. White or saffron text is fine on maroon.

## ⚠️ Don't declare CSS variables
WordCamp's sanitiser **deletes every CSS custom property declaration** (`--anything: value;`)
and `@import`. Reading WordPress's own variables, like `var(--wp--preset--color--contrast)`,
is fine, and that is how this file gets every colour.

It also strips `animation-timeline` and `animation-range` (scroll-driven animations) but
keeps `animation:`, so a scroll animation would jump straight to its end state. Use hover
transitions instead. Checked against the served file on 2026-10-04; `:has()`, `@supports`,
`@keyframes`, `-webkit-line-clamp` and `content:` all survive.

The homepage hero styles apply to `.hero-wrap` (the hero group). The Day 1 / Day 2 group has the class `hero-days`, and the Past WordCamps menu in the footer has `past-wc-nav`.

## Local development (live site + local CSS)
1. `cd remote-css && python3 -m http.server 8027`
2. Install the [Tampermonkey extension for Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en),
   then add `dev-inject.user.js` as a new script.
   (In `chrome://extensions` → Tampermonkey → Details, turn on **Allow User Scripts**.)
3. Open https://pune.wordcamp.org/2027/ — edit the CSS, save, reload.
   The script also loads `dev-switch-palette.css`, so you see the switch-day colours.
   Toggle the userscript off to compare with the current live site.

No-install alternative: paste the body of `dev-inject.user.js` into the DevTools console after each reload.

## Switch day (once Remote CSS is approved)
1. Push this repo, then wp-admin → **Appearance → Remote CSS**: paste the raw GitHub URL of
   `wcpune2027.css`, choose **Add on to the existing CSS**, click **Update**.
2. Copy the webhook URL shown on that screen into GitHub → repo Settings → Webhooks,
   so every `git push` re-syncs the site.
3. Check it's live: view the page source and search for `wordcamp_remote_css`.
   If it's missing, the save on the Remote CSS screen failed: look for a red error there.
4. Empty **Appearance → Additional CSS** (Part A is in the Remote CSS file too).
5. **Site Editor → Styles → Colours**: set each Theme slot (and Brick red) to its
   "Switch day" hex above (also listed in `dev-switch-palette.css`). Save.

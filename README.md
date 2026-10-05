# WordCamp Pune 2027 — Remote CSS

`wcpune2027.css` is the custom stylesheet for pune.wordcamp.org/2027 (theme: Twenty Twenty-Five).
It is loaded on the site through **Appearance → Remote CSS** from the raw GitHub URL of
`WC-Pune/wcpune2027-css` (`main`). **Appearance → Additional CSS** is empty and should stay so.

| File | Purpose |
|---|---|
| `wcpune2027.css` | Site CSS. Part A = layout. Part B = brand styling |
| `dev-inject.user.js` | Dev only — preview local CSS on the live site |

## Colours live in the editor
Every colour is a **Theme** palette slot in **Site Editor → Styles → Colours**. Blocks use those
slots, and the stylesheet only reads them (`var(--wp--preset--color--accent-1)`), so
**the CSS contains no hex values**. To change the look, edit hexes in the editor.
(One exception: the `body .hero-wrap` rule in B6 hardcodes the hero sand `#F3EEE6`.)

| Theme slot | Used for | Live hex |
|---|---|---|
| Base | Page background; text on maroon | `#fbfaf3` |
| Contrast | Body text; text on buttons | `#3d362f` |
| Accent 1 | Maroon: brand, headings, links, footer background | `#8f1402` |
| Accent 2 | Saffron: buttons, link underlines (CSS) | `#f5a623` |
| Accent 3 | Unused (same hex as Base) | `#fbfaf3` |
| Accent 4 | Sand edge: borders on sand (CSS) | `#d6d5d3` |
| Accent 5 | Sand: inputs, light panels | `#e1d9ca` |

Part B of the CSS moves a few areas to a different slot than the blocks use: footer →
Accent 1 with Base text, buttons → Accent 2 with Contrast text.

When you re-colour a block, always pick a Theme slot, never a custom swatch or hex. No block uses
Brick red any more, so it can be deleted from the palette, along with the unused Dark wooden /
Timber / Light yellow / Stone swatches.

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
   Toggle the userscript off to compare with the current live site.

No-install alternative: paste the body of `dev-inject.user.js` into the DevTools console after each reload.

## Homepage flow classes

The homepage CSS supports a clearer visitor flow when the matching blocks are given these Advanced → Additional CSS classes in the WordPress editor:

| Class | Use |
|---|---|
| `home-section` / `home-section__inner` | Shared section wrapper and constrained inner group |
| `hero-days` | Day 1 and Day 2 cards |
| `audience-grid` | Developers, agencies, business owners, students |
| `outcomes-grid` | Why attend / expected outcomes |
| `speakers-grid` / `speakers-coming-soon` | Speaker cards or the coming-soon state |
| `venue-card` | Venue details and Google Maps CTA |
| `sponsor-band` | Sponsor logos and “Become a sponsor” button |
| `community-stats` | Meetups held, past attendees, and years |
| `home-faq` | FAQ accordion for refunds, food, Contributor Day, and beginners |

The CSS keeps these sections responsive and gives the page a deliberate order: event overview → two-day shape → who it is for → outcomes → speakers → venue → sponsors → community proof → FAQ.

## Publishing changes
1. Push to `origin` (`WC-Pune/wcpune2027-css`).
2. If the GitHub webhook isn't set up, go to wp-admin → **Appearance → Remote CSS** and click
   **Update** to re-sync. Check the `ver=` number on `wordcamp_remote_css` in the page source goes up.

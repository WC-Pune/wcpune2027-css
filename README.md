# WordCamp Pune 2027 — Remote CSS

`wcpune2027.css` is the custom stylesheet for pune.wordcamp.org/2027 (theme: Twenty Twenty-Five).
It is loaded on the site through **Appearance → Remote CSS** from the raw GitHub URL of
`WC-Pune/wcpune2027-css` (`main`). **Appearance → Additional CSS** is empty and should stay so.

| File | Purpose |
|---|---|
| `wcpune2027.css` | Site CSS: links, buttons, header, layout, sponsors, hero, search, footer |
| `dev-inject.user.js` | Dev only — preview local CSS on the live site |

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

Classes the CSS relies on (set in Advanced → Additional CSS class): `hero-wrap` on the homepage hero group, `nav-cta` on the header menu item that should look like a button, and `past-wc-nav` on the Past WordCamps menu in the footer.

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
5. **Don't touch Appearance → Additional CSS.** It stays empty. All CSS goes in `wcpune2027.css`.
6. **Target classes, not positions.** Add a class in the block's Advanced → Additional CSS
   class and style that class. Avoid selectors tied to block order, such as `:nth-child`.
7. **`!important` only to beat WordPress.** WordPress marks block colour classes and the phone
   menu overlay `!important`. Use it only when you must override those, and add a comment saying why.
8. **Keep text readable.** Check contrast: never saffron text on white or sand; saffron buttons
   use charcoal text. Keep visible keyboard focus. Wrap motion in
   `@media (prefers-reduced-motion: no-preference)`.
9. **Mobile first check.** Test at 782px, 600px and 480px or narrower, and logged in (the admin bar
   moves the sticky header). Look at the phone menu overlay every time you touch the header.
10. **Keep it small and sectioned.** Put new rules in the matching numbered section (see the file's
    contents list) and comment *why*, not what. Delete rules once the editor does the same job.
11. **Don't hardcode content.** No page-specific text, IDs or URLs. Use block classes.
12. **Check after editor changes.** Template edits live in the database, not in this repo. After
    changing a template or Styles, re-check the page, and remove the CSS rule it replaces.

## Local development (live site + local CSS)
1. `cd remote-css && python3 -m http.server 8027`
2. Install the [Tampermonkey extension for Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en),
   then add `dev-inject.user.js` as a new script.
   (In `chrome://extensions` → Tampermonkey → Details, turn on **Allow User Scripts**.)
3. Open https://pune.wordcamp.org/2027/ — edit the CSS, save, reload.
   Toggle the userscript off to compare with the current live site.

No-install alternative: paste the body of `dev-inject.user.js` into the DevTools console after each reload.

## Publishing changes
1. Push to `origin` (`WC-Pune/wcpune2027-css`).
2. If the GitHub webhook isn't set up, go to wp-admin → **Appearance → Remote CSS** and click
   **Update** to re-sync. Check the `ver=` number on `wordcamp_remote_css` in the page source goes up.

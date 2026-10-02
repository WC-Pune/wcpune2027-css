# WordCamp Pune 2027 — Remote CSS

`wcpune2027.css` is the **only** stylesheet for pune.wordcamp.org/2027 (theme: Twenty Twenty-Five).
It is loaded by **Appearance → Remote CSS**; Appearance → Additional CSS should stay empty.

| File | Purpose |
|---|---|
| `wcpune2027.css` | The live site CSS (what Remote CSS fetches) |
| `dev-inject.user.js` | Dev only — preview local CSS on the live site |
| `legacy-additional-css.css` | Backup of the old Additional CSS, for rollback |

## Palette

| Token | Hex | Use for | Text on it |
|---|---|---|---|
| `--wcp-maroon` | `#8E1616` | Logo, footer background, section dividers, **link text**, button hover | White (9.2:1), Saffron (4.6:1) |
| `--wcp-saffron` | `#F5A623` | Buttons, link underlines, hover accents | **Charcoal only** (8.1:1) — never white (2.0:1) |
| `--wcp-charcoal` | `#1A202C` | All headings and body text | — |
| `--wcp-white` | `#FFFFFF` | Page and header background | Charcoal, Maroon |
| `--wcp-sand` | `#F7F5F0` | Inputs, search/subscribe fields, cards, light borders | Charcoal (15:1), Maroon (8.5:1) |

**Rule of thumb:** saffron is never used for text on a light background.

To change a colour, edit **section 1** of `wcpune2027.css` only.

## How it works
Section 2 remaps the theme's colour presets (`--wp--preset--color--base`, `contrast`,
`accent-1`, `custom-brick-red`, …) to the brand tokens, so every existing block picks up
the new palette without editing content. `!important` is used only where the block editor
writes inline colours or `!important` preset classes (header/hero background, buttons).

## Local development (live site + local CSS)
1. `cd remote-css && python3 -m http.server 8027`
2. Install the [Tampermonkey extension for Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en),
   then add `dev-inject.user.js` as a new script.
   (In `chrome://extensions` → Tampermonkey → Details, turn on **Allow User Scripts**.)
3. Open https://pune.wordcamp.org/2027/ — edit the CSS, save, reload.
   Toggle the userscript off to compare with the current live site.

No-install alternative: paste the body of `dev-inject.user.js` into the DevTools console after each reload.

## Publishing
1. Push this folder to a public GitHub repo (e.g. `wcpune2027-css`).
2. wp-admin → **Appearance → Remote CSS**: paste the GitHub URL of `wcpune2027.css`,
   choose **Add on to the existing CSS**, click **Update**.
3. Copy the webhook URL shown on that screen into GitHub → repo Settings → Webhooks,
   so every `git push` re-syncs the site.
4. Check the live page source: the Remote CSS stylesheet should be listed, and
   the `--wcp-*` variables should still be in it (Remote CSS sanitises the file).
5. Once confirmed, empty **Appearance → Additional CSS** (backup is in `legacy-additional-css.css`).
6. In the editor, change the homepage hero group and header group backgrounds from the
   custom `#e1a48e` to a palette colour; the `[style*="#e1a48e"]` overrides can then be removed.

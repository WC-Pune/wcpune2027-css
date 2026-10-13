# Components and docs: to do

Keeps track of the components that aren't built yet, so none get lost. Move an item to **Done** when it has a partial in `scss/components/`, markup in [patterns.md](patterns.md), a section on the password-protected test page and a row in the [editor guide](editor-guide.md).

## Done
- [x] **Announcement strip** (`announce`), `scss/components/_announce.scss`
- [x] **Ticket card** (`ticket-card`, `ticket-card-featured`), `scss/components/_ticket-card.scss`
- [x] **Info card** (`info-card`), `scss/components/_info-card.scss`
- [x] **404 page** (`error404-*`), `scss/pages/_error404.scss`. Template content is pasted in the Site Editor, not kept in `patterns.md`

## Components still to build
- [ ] **Sponsor cards:** logo grid by tier (Gold, Silver, Community) for `/sponsors`
- [ ] **Stat row:** attendees, speakers, workshops
- [ ] **Sponsor call-to-action:** "become a sponsor" panel
- [ ] **Person card / people grid:** one card for speakers, organizers and `/attendees` (photo, name, role, optional link), once those pages have content
- [ ] **Volunteer call-to-action**
- [ ] **Why attend / workshop format:** short highlight blocks for the homepage
- [ ] **Past event highlights:** image strip or gallery

## Checks
- [ ] Check the **Updates** post cards on the live page after the next Remote CSS sync: desktop and 390px (thumbnail above text on phones, hover border, long titles)
- [ ] Paste the **Info card** onto the test page, sync, and check desktop and 390px (cards equal height, dashed row dividers, label and value, footer button)
- [ ] Save the **Info card** as a pattern in the Site Editor (Synced off, named exactly as in `patterns.md`)
- [ ] Re-check the **Announcement strip** after the label and arrow change (the arrow and pill survived the sanitiser; look at the strip at 390px)
- [x] Paste both patterns onto the password-protected test page and check desktop and 390px (cards equal height, ticks, dashed line, button at the bottom, strip wrapping on phones)
- [x] Check the strip and cards after the next Remote CSS sync; confirm the sanitiser kept the `::before` ticks and the dashed border
- [x] Add the Components table (class, where it goes) to `editor-guide.md`
- [x] Save the **Announcement strip** and **Ticket card** as patterns in the Site Editor (⋮ → Create pattern, Synced off, named exactly as in `patterns.md`) so organizers insert them from the inserter
- [ ] Re-check the 404 page on a phone (~390px): the illustration's text is small, the paragraph below repeats the message
- [ ] Optional: export a smaller (~1600px) 404 image to load faster
- [ ] Still pending: the live page still outputs the orange `.wp-block-buttons` background from Site Editor, so keep the CSS rule until it is gone. Clear the orange background on Site Editor → Styles → Blocks → Buttons, then remove the `.wp-block-buttons` rule from `scss/base/_links-buttons-inputs.scss`

## Check by eye (moved from the README)
- [ ] Footer search and Subscribe (heights, 10px gap, placeholder size), search results cards, the phone menu (divider under the last link, no focus box), the homepage hero and section spacing
- [ ] **Sponsors page:** check the tile styling once the page is published (it returned 404 earlier)
- [ ] **Hero padding** is a fluid `clamp` in CSS; the editor only offers fixed steps. Move it only if that is acceptable
- [ ] **Site title link rule** (`.wp-block-site-title a`) may be redundant now the colour is set in the editor. Remove it if the title looks the same without it
- [ ] **Footer top space** is the `60` spacing step (70px) on every page. Use `50` or `70` in `scss/layout/_footer.scss` if it looks off

## Docs
- [ ] Confirm in the Site Editor whether **Accent 3** is used for the header/hero background, then fix the Accent 3 row in the README and editor guide (currently worded as unconfirmed)
- [ ] Add screenshots to the editor guide: Additional CSS class, inserting a pattern, creating an unsynced pattern, finding the test page, previewing mobile widths

## Content and site (not CSS)
- [ ] Navigation: About, Venue and travel, Workshops, Speakers or organizers, Sponsors, Tickets
- [ ] Venue: make the address a map link
- [ ] Footer density at 390px on a real phone

## Later / maybe
- [ ] Shrinking header on scroll needs JS, because the sanitiser strips the CSS it needs. Not planned.

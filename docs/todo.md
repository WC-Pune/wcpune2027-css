# Components and docs: to do

Keeps track of the components that aren't built yet, so none get lost. Move an item to **Done** when it has a partial in `scss/components/`, markup in [patterns.md](patterns.md), a section on the password-protected test page, a saved pattern in the Site Editor and a row in the [editor guide](editor-guide.md). Until then it stays under **Built, awaiting checks**.

## Done
- [x] **Announcement strip** (`announce`), `scss/components/_announce.scss` (a 390px re-check is open under *Needs a real phone*)
- [x] **Ticket card** (`ticket-card`, `ticket-card-featured`), `scss/components/_ticket-card.scss`
- [x] **404 page** (`error404-*`), `scss/pages/_error404.scss`. Template content is pasted in the Site Editor, not kept in `patterns.md`

## Built, awaiting checks
- [ ] **Info card** (`info-card`), `scss/components/_info-card.scss`. Needs the test page paste and check, and to be saved as a pattern (see *Needs WordPress access*)
- [ ] **Updates / blog cards**, `scss/pages/_blog.scss`. Needs the live check after the next Remote CSS sync (see *Needs WordPress access*)

## Components still to build
Suggested order: sponsor panel (the volunteer call-to-action is a variant of it, so one partial), then stat row and why attend, then the cards that wait on content.
- [ ] **Sponsor call-to-action:** "become a sponsor" panel
- [ ] **Volunteer call-to-action:** variant of the sponsor panel
- [ ] **Stat row:** attendees, speakers, workshops
- [ ] **Why attend / workshop format:** short highlight blocks for the homepage
- [ ] **Sponsor cards:** logo grid by tier (Gold, Silver, Community) for `/sponsors`. Tile CSS already exists in `_cards.scss`; waits on the page being published
- [ ] **Person card / people grid:** one card for speakers, organizers and `/attendees` (photo, name, role, optional link), once those pages have content
- [ ] **Past event highlights:** image strip or gallery. Waits on photos from the content team

## Checks
Grouped by what you need to do them.

### Dev only (CSS)
- [ ] **Buttons background:** the live page still outputs the orange `.wp-block-buttons` background from the Site Editor, so keep the CSS rule until it is gone. After clearing it in the Site Editor (below), remove the `.wp-block-buttons` rule from `scss/base/_links-buttons-inputs.scss`. Do this first: it removes CSS
- [ ] **Site title link rule** (`.wp-block-site-title a`) may be redundant now the colour is set in the editor. Remove it if the title looks the same without it
- [ ] **Footer top space** is the `60` spacing step (70px) on every page. Use `50` or `70` in `scss/layout/_footer.scss` if it looks off
- [ ] **Hero padding** is a fluid `clamp` in CSS; the editor only offers fixed steps. Move it only if that is acceptable
- [ ] Optional: export a smaller (~1600px) 404 image to load faster

### Needs WordPress access (Site Editor or wp-admin)
- [ ] Clear the orange background on Site Editor → Styles → Blocks → Buttons (then the dev-only rule removal above)
- [ ] Check the **Updates** post cards on the live page after the next Remote CSS sync: desktop and 390px (thumbnail above text on phones, hover border, long titles)
- [ ] Paste the **Info card** onto the test page, sync, and check desktop and 390px (cards equal height, dashed row dividers, label and value, footer button)
- [ ] Save the **Info card** as a pattern in the Site Editor (Synced off, named exactly as in `patterns.md`), then update the status table in `patterns.md`
- [ ] **Sponsors page:** check the tile styling once the page is published (it returned 404 earlier)
- [ ] Confirm whether **Accent 3** is used for the header/hero background, then fix the Accent 3 row in the README and editor guide (currently worded as unconfirmed)

### Needs a real phone (~390px)
- [ ] Re-check the **Announcement strip** after the label and arrow change (the arrow and pill survived the sanitiser; look at the strip wrapping)
- [ ] Re-check the **404 page**: the illustration's text is small, the paragraph below repeats the message
- [ ] Footer search and Subscribe (heights, 10px gap, placeholder size), the phone menu (divider under the last link, no focus box), the homepage hero and section spacing, search results cards
- [ ] Footer density on a real phone

## Docs
- [ ] Add screenshots to the editor guide: Additional CSS class, inserting a pattern, creating an unsynced pattern, finding the test page, previewing mobile widths

## Content and site (not CSS)
For the content team.
- [ ] Navigation: About, Venue and travel, Workshops, Speakers or organizers, Sponsors, Tickets
- [ ] Venue: make the address a map link

## Later / maybe
- [ ] Shrinking header on scroll needs JS, because the sanitiser strips the CSS it needs. Not planned.

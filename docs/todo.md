# Components and docs: to do

Keeps track of the components that aren't built yet, so none get lost. Move an item to **Done** when it has a partial under `scss/`, markup in [patterns.md](patterns.md), a section on the password-protected test page, a saved pattern in the Site Editor and a row in the [editor guide](editor-guide.md). Until then it stays under **Built, awaiting checks**.

## Done
- [x] **Ticket card** (`ticket-card`, `ticket-card-featured`), `scss/components/_ticket-card.scss`
- [x] **404 page** (`error404-*`), `scss/pages/_error404.scss`. Template content is pasted in the Site Editor, not kept in `patterns.md`

## Built, awaiting checks
- [ ] **Announcement strip** (`announce`), `scss/components/_announce.scss`. Pattern is saved and was tested live; the 390px re-check after the label and arrow change is open (see *Needs a real phone*)
- [ ] **Info card** (`info-card`), `scss/components/_info-card.scss`. Saved as `WCP27 : Info Card`; still needs the test page paste and check (see *Needs WordPress access*)
- [ ] **Updates / blog cards**, `scss/pages/_blog.scss`. Needs the live check after the next Remote CSS sync (see *Needs WordPress access*)

## Components still to build
Suggested order: sponsor panel (the volunteer call-to-action is a variant of it, so one partial), then stat row and why attend, then the cards that wait on content. The card hover (border, shadow, lift) is repeated in `_cards.scss`, `_ticket-card.scss` and `_blog.scss`; when the next card component is built, share it through an SCSS mixin.
- [ ] **Sponsor call-to-action:** "become a sponsor" panel
- [ ] **Volunteer and speaker call-to-action:** variants of the sponsor panel, not separate partials
- [ ] **Stat row:** attendees, speakers, workshops
- [ ] **Key dates:** deadlines (call for speakers, early-bird end, schedule release) as a short list or timeline. Useful before the stat row has real numbers; the announcement strip only holds one fact
- [ ] **Why attend / workshop format:** short highlight blocks for the homepage
- [ ] **Session / schedule card:** time, room or track, title, speaker, optional description. Search already labels `wcb_session` as "Session"; the person card does not cover this. Needs the content model (what the schedule data looks like) first
- [ ] **Person card / people grid:** one card for speakers, organizers, volunteers and `/attendees` (photo, name, role, optional link). Decide first whether one card covers all four; build once those pages have content
- [ ] **Sponsors archive:** publish and validate the sponsor page, then add tier labels (Gold, Silver, Community). Tile CSS already exists in `_cards.scss`, so this is mostly validation, not a new component
- [ ] **Past event highlights:** image strip or gallery. Waits on photos from the content team

Considered, and not yet planned (build only if the content needs it):
- **FAQ on the Details block** for ticket, venue, accessibility, refunds, travel and code of conduct questions. The editor supplies the block, so CSS only needs the open and closed look. First confirm the block is keyboard and screen-reader accessible
- **Code of conduct / accessibility callout:** a compact highlight for key attendee information. Try an `announce` or `info-card` variant first
- **Venue panel:** the Info card probably covers it. Build a separate component only if the layout needs a different look

## Checks
Pick the group that matches what you have to hand: the code, a WordPress login, or a real phone. Do an item, tick it, and move any follow-up to the right group.

### Dev only (CSS)
- [ ] **Buttons background:** the live page still outputs the orange `.wp-block-buttons` background from the Site Editor, so keep the CSS rule until it is gone. After clearing it in the Site Editor (below), remove the `.wp-block-buttons` rule from `scss/base/_links-buttons-inputs.scss`. Do this first: it removes CSS
- [ ] **Site title link rule** (`.wp-block-site-title a`) may be redundant now the colour is set in the editor. Remove it if the title looks the same without it
- [ ] **Footer top space** is the `60` spacing step (70px) on every page. Use `50` or `70` in `scss/layout/_footer.scss` if it looks off
- [ ] **Hero padding** is a fluid `clamp` in CSS; the editor only offers fixed steps. Move it only if that is acceptable
- [ ] **Keyboard focus on linked cards:** the cards whose click target is a link inside the card. Search stretches that link over the card with `::after`, so the outline can miss the card edge. Check the sponsor, search, ticket, info and Updates cards
- [ ] Optional: export a smaller (~1600px) 404 image to load faster

### Needs WordPress access (Site Editor or wp-admin)
- [ ] Clear the orange background on Site Editor → Styles → Blocks → Buttons (then the dev-only rule removal above)
- [ ] Check the **Updates** post cards on the live page after the next Remote CSS sync: desktop and 390px (thumbnail above text on phones, hover border, long titles)
- [ ] Paste the **Info card** onto the test page, sync, and check desktop and 390px (cards equal height, dashed row dividers, label and value, footer button)
- [ ] Clean up the saved patterns in Site Editor → Patterns: delete the duplicate `WCP27 : Ticket Card`, and check **Synced** is off on all four (the inserter shows the synced icon on most). Then update the status table in `patterns.md`
- [ ] **Sponsors page:** check the tile styling once the page is published (it returned 404 earlier)
- [ ] Confirm whether **Accent 3** is used for the header/hero background, then fix the Accent 3 row in the README and editor guide (currently worded as unconfirmed)

### Needs a real phone (~390px)
- [ ] Re-check the **Announcement strip** after the label and arrow change (the arrow and pill survived the sanitiser; look at the strip wrapping)
- [ ] Re-check the **404 page**: the illustration's text is small, the paragraph below repeats the message
- [ ] Footer search and Subscribe (heights, 10px gap, placeholder size), the phone menu (divider under the last link, no focus box), the homepage hero and section spacing, search results cards
- [ ] Footer density on a real phone

## Docs
- [ ] Add a **pattern template** to `patterns.md` (headings: when to use, markup, swatches, mobile notes) so new components are documented the same way
- [ ] Retake `docs/images/Search-for-patterns-with-WCP27.jpg` after the pattern cleanup (it still shows the duplicate Ticket Card and synced icons)
- [ ] Retake `docs/images/Adding-Classes.jpg` with a class from the table: it shows `hero-days`, which has no CSS
- [ ] Add the remaining screenshots to the editor guide: creating an unsynced pattern, finding the test page, previewing mobile widths

## Content and site (not CSS)
For the content team.
- [ ] Navigation: About, Venue and travel, Workshops, Speakers or organizers, Sponsors, Tickets
- [ ] Venue: make the address a map link

## Later / maybe
- [ ] Shrinking header on scroll needs JS, because the sanitiser strips the CSS it needs. Not planned.

# Components and docs: to do

Keeps track of the components that aren't built yet, so none get lost. Move an item to **Done** when it has a partial in `scss/components/`, markup in [patterns.md](patterns.md), a section on the private test page and a row in the [editor guide](editor-guide.md).

## Done
- [x] **Announcement strip** (`announce`), `scss/components/_announce.scss`
- [x] **Ticket card** (`ticket-card`, `ticket-card-featured`), `scss/components/_ticket-card.scss`

## Components still to build
- [ ] **Info card:** venue, travel and contact details (map link, address, accessibility notes)
- [ ] **Stat row:** attendees, speakers, workshops
- [ ] **Sponsor call-to-action:** "become a sponsor" panel
- [ ] **Attendees / people grid:** speakers and organizers, once those pages have content
- [ ] **Volunteer call-to-action**
- [ ] **Why attend / workshop format:** short highlight blocks for the homepage
- [ ] **Past event highlights:** image strip or gallery

## Checks
- [ ] Paste both patterns onto the private test page and check desktop and 390px (cards equal height, ticks, dashed line, button at the bottom, strip wrapping on phones)
- [ ] Check the strip and cards after the next Remote CSS sync; confirm the sanitiser kept the `::before` ticks and the dashed border
- [ ] Add the Components table (class, where it goes) to `editor-guide.md`
- [ ] Save the finished patterns in the Site Editor so organizers can insert them
- [ ] Clear the orange background on Site Editor → Styles → Blocks → Buttons, then remove the `.wp-block-buttons` rule from `scss/base/_links-buttons-inputs.scss`

## Content and site (not CSS)
- [ ] Navigation: About, Venue and travel, Workshops, Speakers or organizers, Sponsors, Tickets
- [ ] Venue: make the address a map link
- [ ] Footer density at 390px on a real phone

## Later / maybe
- [ ] Shrinking header on scroll needs JS, because the sanitiser strips the CSS it needs. Not planned.

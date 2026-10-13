# Components and docs: to do

Keeps track of the components that aren't built yet, so none get lost. Move an item to **Done** when it has a partial in `scss/components/`, markup in [patterns.md](patterns.md), a section on the password-protected test page, a saved pattern in the Site Editor and a row in the [editor guide](editor-guide.md). Until then it stays under **Built, awaiting checks**.

## Done
- [x] **Ticket card** (`ticket-card`, `ticket-card-featured`), `scss/components/_ticket-card.scss`
- [x] **404 page** (`error404-*`), `scss/pages/_error404.scss`. Template content is pasted in the Site Editor, not kept in `patterns.md`

## Built, awaiting checks
- [ ] **Announcement strip** (`announce`), `scss/components/_announce.scss`. Pattern is saved and was tested live; the 390px re-check after the label and arrow change is open (see *Needs a real phone*)
- [ ] **Info card** (`info-card`), `scss/components/_info-card.scss`. Needs the test page paste and check, and to be saved as a pattern (see *Needs WordPress access*)
- [ ] **Updates / blog cards**, `scss/pages/_blog.scss`. Needs the live check after the next Remote CSS sync (see *Needs WordPress access*)

## Components still to build
Suggested order: sponsor panel (the volunteer call-to-action is a variant of it, so one partial), then stat row and why attend, then the cards that wait on content.
- [ ] **Sponsor call-to-action:** "become a sponsor" panel
- [ ] **Volunteer call-to-action:** variant of the sponsor panel
- [ ] **Stat row:** attendees, speakers, workshops
- [ ] **Why attend / workshop format:** short highlight blocks for the homepage
- [ ] **Session / schedule card:** time, title, speaker, room, track, optional description, for talks and workshops. Needs the content model (what the schedule data looks like) first
- [ ] **Person card / people grid:** one card for speakers, organizers, volunteers and `/attendees` (photo, name, role, optional link). Decide first whether one card covers all four; build once those pages have content
- [ ] **Sponsors archive:** publish and validate the sponsor page, then add tier labels (Gold, Silver, Community). Tile CSS already exists in `_cards.scss`, so this is mostly validation, not a new component
- [ ] **Past event highlights:** image strip or gallery. Waits on photos from the content team

Considered, and not yet planned (build only if the content needs it):
- **FAQ / accordion** for venue, accessibility, tickets, refunds, travel and code of conduct. First confirm the WordPress block (Details or Accordion) is keyboard and screen-reader accessible before styling it
- **Code of conduct / accessibility callout:** a compact highlight for key attendee information. Try an `announce` or `info-card` variant first
- **Venue panel:** the Info card probably covers it. Build a separate component only if the layout needs a different look

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

## QA and maintenance
Owner column: who has to do it. **Dev** = developers, **WP** = someone with WordPress access, **Content** = content team.
- [ ] **Accessibility QA** (Dev): keyboard navigation, visible focus, heading order, link names, form labels, contrast, reduced motion and screen-reader behaviour. Do this before the next big announcement
- [ ] **Browser QA** (Dev): Chrome, Safari and Firefox, at desktop, tablet and 390px
- [ ] **Link and content QA** (Content): menu links, map links, ticket links, social links, empty search results and 404 links
- [ ] **Sanitiser regression check** (Dev): after CSS changes, compare the served file with the build and confirm `:has()`, pseudo-elements, `content`, `@keyframes` and reduced-motion rules survived
- [ ] **Pattern acceptance criteria** (Dev): before a pattern counts as done, test long headings, missing images, missing optional fields, long URLs and narrow screens. Add the list to `patterns.md`
- [ ] **Alt text guidance** (Content): add a short section to the editor guide for sponsor logos, speaker photos, venue images and decorative images
- [ ] **Performance check** (Dev + Content): image dimensions, compression and lazy loading; shrink the 404 illustration (see Checks)
- [ ] **Dependency maintenance** (Dev): document when to run `npm outdated`, how to update Sass safely and how to regenerate `package-lock.json`
- [ ] **Live-sync record** (WP): note the date of the last successful Remote CSS sync and the `ver=` number served, in this file or the README
- [ ] **Ownership:** add an owner (Dev, WP or Content) to the open Checks that don't have one

## Code health and tooling
Found in a review of the repo on 2026-10-13.
- [ ] **Stale pointer:** the header comment in `scss/main.scss` says "See README.md for the guidelines", but they moved to `docs/developer-guide.md`. Fix it and run `npm run build`, since the comment is copied into `wcpune2027.css`
- [ ] **CI check:** there is no `.github/`. Add a GitHub Action that runs `npm ci && npm run check` on pull requests, so a forgotten build can't be merged
- [ ] **Guard script:** add an `npm run lint` that fails on `--name:` declarations and `@import` in `scss/` (the sanitiser deletes them), and on hex colours outside the footer's social-network colours. This turns two written rules into automatic checks
- [ ] **Node version:** the docs say Node 18+, but `package.json` has no `engines` field and there is no `.nvmrc`. Add both
- [ ] **Breakpoints:** the CSS uses 781px (`_hero.scss`) and 782px (`_header.scss`) for what looks like the same phone/tablet switch, plus 600px and 480px. Check whether the 1px difference is on purpose; if not, align them and note the breakpoints in the developer guide
- [ ] **Keyboard focus:** `:focus-visible` is only styled in the header, footer, announce strip and base links/buttons. Check keyboard focus on the sponsor, search, ticket, info and Updates cards, and the 404 buttons
- [ ] **Repeated card styling:** the card hover (border, shadow, lift) is written separately in `_cards.scss`, `_ticket-card.scss` and `_blog.scss`. When the next card component is built, share it through an SCSS mixin (SCSS mixins compile away, so the sanitiser doesn't matter)
- [ ] **Empty `tools/` folder:** it is untracked and unused locally. Delete it, or add what was meant to go in it
- [ ] Optional: print styles (hide the header and footer, show link URLs) if organizers will print the schedule

## Docs
- [ ] Add a short **"how a component is built"** checklist to the developer guide: partial, `@use` line in `main.scss`, header comment number, markup in `patterns.md`, test page section, editor guide row. (Today it is only spread across `todo.md` and the README table)
- [ ] Add a **pattern template** to `patterns.md` (headings: when to use, markup, swatches, mobile notes) so new components are documented the same way
- [ ] Add screenshots to the editor guide: Additional CSS class, inserting a pattern, creating an unsynced pattern, finding the test page, previewing mobile widths

## Content and site (not CSS)
For the content team.
- [ ] Navigation: About, Venue and travel, Workshops, Speakers or organizers, Sponsors, Tickets
- [ ] Venue: make the address a map link

## Later / maybe
- [ ] Shrinking header on scroll needs JS, because the sanitiser strips the CSS it needs. Not planned.

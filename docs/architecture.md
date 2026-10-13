# Architecture and constraints

Why the CSS is written the way it is. Read this before adding a rule or removing one that looks odd. Day-to-day instructions are in the [developer guide](developer-guide.md).

## What the WordCamp.org sanitiser does
WordCamp's sanitiser **deletes every CSS custom property declaration** (`--anything: value;`)
and `@import`. Reading WordPress's own variables, like `var(--wp--preset--color--contrast)`,
is fine, and that is how this file gets every colour.

It also strips `animation-timeline` and `animation-range` (scroll-driven animations) but
keeps `animation:`, so a scroll animation would jump straight to its end state. Use hover
transitions instead. Checked against the served file on 2026-10-04; `:has()`, `@supports`,
`@keyframes`, `-webkit-line-clamp` and `content:` all survive.

SCSS `$variables` are fine because they compile away.

## Why the CSS does what it does
Short reasons, kept here so the CSS file stays comment-light.

- **Buttons stay in CSS.** Styles → Elements → Buttons has no text colour, and the Search and
  Jetpack Subscribe buttons are not Button blocks, so Blocks → Button doesn't reach them.
  WordPress marks block colour classes `!important`, hence `body …` with `!important`.
- **Inputs and placeholders.** Jetpack's subscribe form styles its placeholder with a stronger
  selector (`!important` needed). Logged in, Jetpack pre-fills and disables the email field and
  fades it to 50%, which turns it pink and unreadable on the maroon footer. Visitors never see this.
- **Link underline** (colour, thickness, offset) can't be set in the editor. Link text colour comes
  from Styles → Colours → Link.
- **Header.** The maroon top strip and thin bottom line are set in the editor (Border panel). The CSS
  only adds sticky behaviour, with offsets for the admin bar (32px, 46px under 783px, none under
  601px). The phone menu overlay needs `!important` because WordPress's overlay rules are very
  specific. Opening the menu focuses the first link, so menu links show a saffron underline instead
  of the focus box.
- **Header is compact, not shrinking.** Shrink-on-scroll needed `container-type: scroll-state` and
  `@container`, but the sanitiser strips `container-type` and breaks the `@container` block, so it
  never worked in Remote CSS. Don't add it back. The header stays sticky with fixed small padding and logo.
- **`nav-cta`** on a menu item makes it a saffron pill (full-width button in the phone menu).
  Use it for Contact now, Tickets later.
- **Sponsors.** WordPress forces each logo into a 16:9 box, which leaves wordmarks floating, so
  logos go in a 3:1 box with padding. The 2-per-row phone layout applies to the page with the slug `sponsors`.
- **Hero.** The clip-path, hover zoom, fading veil, caption box, photo order and 4:3 photo on phones
  can't be set in the editor. Everything static (chips, eyebrow, icons, radius, borders, padding)
  is.
- **Search results.** The Search Results template prints each result's full content, so the CSS
  trims it to a 3-line description and shows a small label for the result type. An Excerpt block in
  the template would be better than the Content block. Only the main (full-width) query is styled,
  not "More posts".
- **Footer.** The editor sets the footer sand with maroon text; the CSS makes it maroon with
  page-colour text. A maroon hover would vanish on maroon, so footer buttons use the page colour on
  hover. The logo PNG already includes its ring; the radius only clips its transparent corners.
  Social icons are plain; each network's own colour shows on hover, and those hexes are the
  networks' own, not our palette.
- **Scroll animations don't work** (see the sanitiser note above), so images zoom on hover instead.

## Where each kind of change lives
- Templates, Styles and the Site Editor save to the WordPress database, **not** to this repo. After changing one, re-check the page and remove any CSS rule it replaces.
- Rules in the Core/Jetpack editor (Additional CSS, Site Editor styles) take precedence over Remote CSS.
- The site doesn't read the CSS file on each page load. WordCamp.org downloads it, sanitises and minifies it, and stores a local copy, which it re-syncs through the webhook (see [Publishing](../README.md#publishing-changes)).

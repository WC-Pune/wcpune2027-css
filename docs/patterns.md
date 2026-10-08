# Block patterns

Markup for the components in `scss/components/`. To use one:

1. Open the password-protected test page, switch the editor to **Code editor** (⋮ menu), paste the markup, then switch back to the visual editor.
2. Check how it looks (desktop and about 390px).
3. To make it reusable: select the whole block → ⋮ → **Create pattern**, name it as below, and leave **Synced** off. Organizers then insert it from the inserter under Patterns.

Colours use the theme swatches only. Change the swatch in the editor, never add a hex.

## Announcement strip (`announce`)
Full width, one line. A small pill label ("New", "Tickets") sits ahead of the message, and the link gets an arrow automatically. Use the Accent 1 swatch (maroon) for the strip. Put it at the top of the homepage, under the header.

```html
<!-- wp:group {"align":"full","className":"announce","style":{"spacing":{"padding":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20"}}},"backgroundColor":"accent-1","textColor":"base","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull announce has-base-color has-accent-1-background-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--20);padding-bottom:var(--wp--preset--spacing--20)"><!-- wp:group {"className":"announce__row","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"center"}} -->
<div class="wp-block-group announce__row"><!-- wp:paragraph {"className":"announce__label"} -->
<p class="announce__label">Tickets</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Early-bird closes 30 November. <a href="https://pune.wordcamp.org/2027/tickets/">Get yours</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
```

Edit the label, the sentence and the link. Don't type the arrow, the CSS adds it. Lead with a date or deadline and keep it to one fact per strip. The label is optional: delete that paragraph (and the inner Row) for a plain strip.

Copy to start from:

| Phase | Label | Message | Link text |
|---|---|---|---|
| Tickets open | Tickets | Early-bird closes 30 November. | Get yours |
| Call for speakers | Speakers | Call for speakers is open until 15 January. | Apply to speak |
| Schedule live | Schedule | The full schedule is out. | See the schedule |
| Sold out | Sold out | Tickets are gone. | Join the waitlist |

## Ticket card (`ticket-card`)
One card per pattern, so editors can add as many as they need. Layout from the Deccan Queen on Rails ticket page: a header (type pill, state pill, name), a body (description and list), and a sand footer (price, note, button).

**To use it:** add a **Columns** block (2 or 3 columns), then insert this pattern into each column and edit the text. For the recommended ticket, add `ticket-card-featured` next to `ticket-card` in Additional CSS class.

```html
<!-- wp:group {"className":"ticket-card","style":{"border":{"radius":"12px"}},"backgroundColor":"base","layout":{"type":"default"}} -->
<div class="wp-block-group ticket-card has-base-background-color has-background" style="border-radius:12px"><!-- wp:group {"className":"ticket-card__header","style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}}},"layout":{"type":"default"}} -->
<div class="wp-block-group ticket-card__header" style="padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--30)"><!-- wp:group {"className":"ticket-card__badges","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
<div class="wp-block-group ticket-card__badges"><!-- wp:paragraph {"className":"ticket-card__type"} -->
<p class="ticket-card__type">Conference</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"ticket-card__state"} -->
<p class="ticket-card__state">On sale</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">General ticket</h3>
<!-- /wp:heading --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"ticket-card__body","style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}}},"layout":{"type":"default"}} -->
<div class="wp-block-group ticket-card__body" style="padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--30)"><!-- wp:paragraph -->
<p>Entry for both days of the conference.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>All talks and keynotes</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Lunch and refreshments</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Event kit</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"ticket-card__footer","style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}}},"backgroundColor":"accent-5","layout":{"type":"default"}} -->
<div class="wp-block-group ticket-card__footer has-accent-5-background-color has-background" style="padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--30)"><!-- wp:paragraph {"className":"ticket-card__price"} -->
<p class="ticket-card__price">₹0</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"ticket-card__note"} -->
<p class="ticket-card__note">GST included</p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="https://pune.wordcamp.org/2027/tickets/">Get ticket</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
```

Keep the class names (`ticket-card__header`, `__badges`, `__type`, `__state`, `__body`, `__footer`, `__price`, `__note`). Edit the text, list and link; set the pill text to what fits ("Conference", "Workshop", "On sale", "Sold out"). To add a list item, press Enter at the end of the last one; the tick appears automatically.

Don't put `--` in a class name in block markup: it breaks the block comment and the editor "recovers" the block, losing its padding and classes. That's why the modifier is `ticket-card-featured`, not `ticket-card--featured`.

The prices, names and the `/tickets/` link are placeholders. Replace them before using a card on a public page.

## Info card (`info-card`)
Venue, travel and contact details as label and value rows, with an optional map button. One card per pattern, so editors can add as many as they need (Venue, Getting here, Contact).

**To use it:** add a **Columns** block (2 or 3 columns), then insert this pattern into each column and edit the text. Change the heading to what the card covers.

```html
<!-- wp:group {"className":"info-card","style":{"border":{"radius":"12px"}},"backgroundColor":"base","layout":{"type":"default"}} -->
<div class="wp-block-group info-card has-base-background-color has-background" style="border-radius:12px"><!-- wp:group {"className":"info-card__header","style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}}},"layout":{"type":"default"}} -->
<div class="wp-block-group info-card__header" style="padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--30)"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Venue</h3>
<!-- /wp:heading --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"info-card__body","style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}}},"layout":{"type":"default"}} -->
<div class="wp-block-group info-card__body" style="padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--30)"><!-- wp:group {"className":"info-card__row","layout":{"type":"default"}} -->
<div class="wp-block-group info-card__row"><!-- wp:paragraph {"className":"info-card__label"} -->
<p class="info-card__label">Address</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"info-card__value"} -->
<p class="info-card__value">Venue name, street, Pune 411001</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"info-card__row","layout":{"type":"default"}} -->
<div class="wp-block-group info-card__row"><!-- wp:paragraph {"className":"info-card__label"} -->
<p class="info-card__label">Nearest station</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"info-card__value"} -->
<p class="info-card__value">Pune Junction, about 15 minutes by auto</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"info-card__row","layout":{"type":"default"}} -->
<div class="wp-block-group info-card__row"><!-- wp:paragraph {"className":"info-card__label"} -->
<p class="info-card__label">Parking</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"info-card__value"} -->
<p class="info-card__value">Limited on site; use public transport if you can</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"info-card__row","layout":{"type":"default"}} -->
<div class="wp-block-group info-card__row"><!-- wp:paragraph {"className":"info-card__label"} -->
<p class="info-card__label">Accessibility</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"info-card__value"} -->
<p class="info-card__value">Step-free entrance and lift to all floors</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"info-card__footer","style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}}},"backgroundColor":"accent-5","layout":{"type":"default"}} -->
<div class="wp-block-group info-card__footer has-accent-5-background-color has-background" style="padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--30)"><!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="https://maps.google.com/">Open in Maps</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
```

Keep the class names (`info-card__header`, `__body`, `__row`, `__label`, `__value`, `__footer`). Edit the heading, labels, values and the button link. Duplicate a row (select the Row group → ⋮ → Duplicate) to add a detail; delete a row you don't need. For no map button, delete the footer Group. Make the address a link to the map by selecting the text and adding the link.

Don't put `--` in a class name in block markup (see the ticket card note above). The address, station, parking and accessibility lines are placeholders. Replace them with the real venue details before using a card on a public page.

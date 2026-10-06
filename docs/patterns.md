# Block patterns

Markup for the components in `scss/components/`. To use one:

1. Open the private test page, switch the editor to **Code editor** (⋮ menu), paste the markup, then switch back to the visual editor.
2. Check how it looks (desktop and about 390px).
3. To make it reusable: select the whole block → ⋮ → **Create pattern**, name it as below, and leave **Synced** off. Organizers then insert it from the inserter under Patterns.

Colours use the theme swatches only. Change the swatch in the editor, never add a hex.

## Announcement strip (`announce`)
Full width, one or two lines, optional buttons. Use the Accent 1 swatch (maroon) for the strip. Put it at the top of the homepage, under the header.

```html
<!-- wp:group {"align":"full","className":"announce","style":{"spacing":{"padding":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20"}}},"backgroundColor":"accent-1","textColor":"base","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull announce has-base-color has-accent-1-background-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--20);padding-bottom:var(--wp--preset--spacing--20)"><!-- wp:paragraph -->
<p>Tickets are now open. <a href="https://pune.wordcamp.org/2027/tickets/">Get yours</a>.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->
```

Edit the sentence and link. For "what's open now", keep it to one fact per strip.

## Ticket card (`ticket-card`)
One card per column. Add `ticket-card-featured` next to `ticket-card` in Additional CSS class for the recommended ticket. The example is a row of two.

```html
<!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"ticket-card","style":{"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}},"border":{"radius":"12px"}},"backgroundColor":"base","layout":{"type":"default"}} -->
<div class="wp-block-group ticket-card has-base-background-color has-background" style="border-radius:12px;padding-top:var(--wp--preset--spacing--40);padding-right:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40);padding-left:var(--wp--preset--spacing--40)"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">General ticket</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"x-large","style":{"typography":{"fontWeight":"700"}}} -->
<p class="has-x-large-font-size" style="font-weight:700">₹0</p>
<!-- /wp:paragraph -->

<!-- wp:separator {"className":"ticket-card__perf"} -->
<hr class="wp-block-separator has-alpha-channel-opacity ticket-card__perf"/>
<!-- /wp:separator -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Entry to both days</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Lunch and refreshments</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Event kit</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="https://pune.wordcamp.org/2027/tickets/">Get ticket</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"ticket-card ticket-card-featured","style":{"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}},"border":{"radius":"12px"}},"backgroundColor":"base","layout":{"type":"default"}} -->
<div class="wp-block-group ticket-card ticket-card-featured has-base-background-color has-background" style="border-radius:12px;padding-top:var(--wp--preset--spacing--40);padding-right:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40);padding-left:var(--wp--preset--spacing--40)"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Workshop + conference</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"x-large","style":{"typography":{"fontWeight":"700"}}} -->
<p class="has-x-large-font-size" style="font-weight:700">₹0</p>
<!-- /wp:paragraph -->

<!-- wp:separator {"className":"ticket-card__perf"} -->
<hr class="wp-block-separator has-alpha-channel-opacity ticket-card__perf"/>
<!-- /wp:separator -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Everything in General</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Day 1 workshop seat</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="https://pune.wordcamp.org/2027/tickets/">Get ticket</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->
```

Don't put `--` in a class name in block markup: it breaks the block comment and the editor "recovers" the block, losing its padding and classes. That's why the modifier is `ticket-card-featured`, not `ticket-card--featured`.

The prices, names and the `/tickets/` link are placeholders. Replace them before using a card on a public page.

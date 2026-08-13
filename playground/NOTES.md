# FE-05: Accessible Component Fundamentals — Notes

This document compares the three components built from scratch in `playground/`
(Modal, Tabs, Disclosure) against the equivalents added via `shadcn/ui` (Dialog, Tabs),
which are themselves built on top of `@base-ui/react` primitives.

## Dialog vs. our Modal

**What shadcn/Base UI handled that we missed:**

1. **Rendering via a Portal.** Their `DialogPortal` renders the dialog outside the
   normal DOM tree (typically appended near `<body>`). Our Modal renders inline
   wherever it's called from, which means it could be clipped or visually broken by
   an ancestor with `overflow: hidden` or a lower `z-index` stacking context.

2. **Body scroll lock.** Base UI's dialog prevents the page behind the dialog from
   scrolling while it's open. Our Modal does not — a user could scroll the page
   behind the open modal, which is disorienting and technically lets keyboard/touch
   users interact with content that's supposed to be inert.

3. **Enter/exit animations tied to state.** Their dialog uses `data-open` /
   `data-closed` attributes to drive fade and zoom transitions. Ours appears and
   disappears instantly with no transition, which is a smaller issue but affects
   perceived polish and can be jarring for users.

4. **Inert background content.** Base UI dialogs mark the rest of the page as
   inert (non-interactive, hidden from assistive tech) while open, on top of the
   `aria-modal` attribute. Our Modal relies on `aria-hidden` on the overlay div only
   — it doesn't explicitly make the rest of the *page* (outside the overlay)
   inaccessible to screen readers, which the overlay's `aria-hidden="true"` doesn't
   fully achieve since it's only on the overlay wrapper, not the rest of the app.

**What we got right:** our Modal does correctly trap Tab focus, close on Escape,
restore focus to the trigger on close, and use `role="dialog"` +
`aria-modal="true"` + `aria-labelledby` — the same core ARIA contract Base UI
implements, just without the portal/scroll-lock/animation layer around it.

## Tabs vs. our Tabs

**What shadcn/Base UI handled that we missed:**

1. **Orientation support.** Their `Tabs` root accepts a `orientation` prop
   (`horizontal` / `vertical`) and adjusts both the keyboard behavior (which arrow
   keys move focus) and the layout accordingly. Ours only supports horizontal
   left/right arrow navigation — we didn't handle a vertical tab list with
   up/down arrows at all.

2. **Disabled tab handling.** Their `TabsTrigger` supports a disabled state
   (`disabled:pointer-events-none`, `aria-disabled`) that's skipped during keyboard
   navigation. Our implementation has no concept of a disabled tab — if we added
   one, our arrow-key logic would still stop on it.

**What we got right:** our Tabs correctly uses `role="tablist"` / `role="tab"` /
`role="tabpanel"`, manages a *roving tabindex* (only the active tab is
`tabIndex={0}`, others are `-1`), supports Left/Right/Home/End arrow key
navigation, and links each panel to its tab via `aria-controls` /
`aria-labelledby` — matching the core ARIA Authoring Practices pattern for tabs.

## Disclosure

We didn't install a shadcn/ui disclosure/accordion component to compare directly,
but building it from scratch highlighted how little extra machinery a disclosure
actually needs: a single `<button>` with `aria-expanded` and `aria-controls` is
enough, since native `<button>` already handles Enter/Space activation and focus
without any extra keyboard code. This was the simplest of the three by a wide
margin — no focus trapping, no roving tabindex, no key navigation.

## Summary

The two concrete gaps we'd prioritize fixing in our own components, in order of
impact:

1. **Body scroll lock on the Modal** — currently a real usability gap, not just
   a nice-to-have.
2. **Rendering the Modal in a portal** — currently a latent bug that would only
   surface once the Modal is used inside a container with `overflow: hidden` or
   a constrained stacking context (e.g. once it's dropped into an actual page
   layout with a sticky header, as ours already has).

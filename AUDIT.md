# Accessibility & Performance Audit

## Page audited
`/chat` — the capstone's primary flow (streaming AI chat with tool calls).

## Before

Lighthouse (Mobile, Chromium 151, emulated Moto G Power, slow 4G, single
page session) — captured Aug 16, 2026:

| Category       | Score |
|-----------------|-------|
| Performance     | 82    |
| Accessibility   | 100   |
| Best Practices  | 100   |
| SEO             | 91    |

Key metrics:
- First Contentful Paint: 1.7s
- Largest Contentful Paint: 1.8s
- Total Blocking Time: 330ms
- Cumulative Layout Shift: 0
- Speed Index: 15.5s

Top opportunities flagged by Lighthouse:
- Document request latency — est. savings 2,410ms
- Reduce unused JavaScript — est. savings 85 KiB
- Legacy JavaScript — est. savings 14 KiB
- Render-blocking requests
- 12 long main-thread tasks

## Changes made

1. **Missing form label (WAVE error)** — added `aria-label="Chat message"`
   to the chat text input, which previously relied on `placeholder` alone.
2. **Redundant link (WAVE alert)** — removed the duplicate "Home" nav link,
   since the header logo already links to `/`, leaving two adjacent links
   to the same destination.
3. **Streamed output not announced** — added `role="log"`,
   `aria-live="polite"`, and `aria-atomic="false"` to the messages
   container so screen readers announce new assistant text as it streams
   in, without interrupting mid-sentence on every token.
4. **Keyboard-only pass** — manually verified the entire primary flow
   (suggestion chips, input, Send, Stop, Retry) is reachable and operable
   with Tab/Enter/Space alone, with visible focus states throughout.
5. **Lazy-loaded `react-markdown` and `remark-gfm`** — previously loaded
   eagerly with the page even though they're only needed once a message
   has arrived. Now loaded dynamically via `next/dynamic` and a lazy
   `import()`, keeping them out of the initial JS bundle.

## After

Lighthouse (Mobile, same settings as baseline) — captured after the
changes above:

| Category       | Before | After | Delta |
|-----------------|--------|-------|-------|
| Performance     | 82     | 89    | +7    |
| Accessibility   | 100    | 100   | —     |
| Best Practices  | 100    | 100   | —     |
| SEO             | 91     | 100   | +9    |

Key metrics:
- First Contentful Paint: 1.7s → 1.4s
- Largest Contentful Paint: 1.8s → 1.4s
- Speed Index: 15.5s → 3.6s
- Cumulative Layout Shift: 0 → 0

WAVE: 1 error + 1 alert → **0 errors, 0 alerts** (AIM Score 9.4 → 10/10).

Performance is 9 points above the rubric's 80 minimum. The remaining gap
to the 90 target comes from render-blocking requests and unused JS in
third-party chunks (documented in Lighthouse's Insights panel) — left as
a known next step rather than chased further given the assignment's time
budget.
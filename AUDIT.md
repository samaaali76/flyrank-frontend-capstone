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

_(to be filled in as fixes land)_

## After

_(to be filled in after re-running Lighthouse)_
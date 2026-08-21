# FlyRank Frontend Capstone

A Next.js portfolio site with a streaming AI chat assistant, built as
part of the FlyRank Frontend AI Engineering internship.

**Live:** https://flyrank-frontend-capstone-tau.vercel.app/chat

---

## What it does

Visitors can chat with an AI assistant embedded in the portfolio to ask
about the projects and skills of the site's owner. The assistant can
call a real tool to look up project details and render them as a
component (not just text), streams its responses token by token, and
handles failure gracefully with a working retry.

## Screenshots

_(Add 2–3 screenshots here: the empty state, a streamed response with a
tool result, and the error/retry state.)_

## Run it locally

```bash
git clone https://github.com/samaaali76/flyrank-frontend-capstone.git
cd flyrank-frontend-capstone
npm install --legacy-peer-deps
cp .env.example .env.local   # then fill in your API key, see table below
npm run dev
```

Open [http://localhost:3000/chat](http://localhost:3000/chat).

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Yes | API key for Google Gemini, used to power the chat. Get one free at [aistudio.google.com/apikey](https://aistudio.google.com/apikey). |

## Architecture overview


## AI integration

The chat uses **Google Gemini** via the [AI SDK](https://ai-sdk.dev)'s
`streamText`, with one server-side tool:

### `getProjectInfo`

Looks up details about the portfolio's projects — used when a visitor
asks about a specific project or wants to see what's been built. The
model calls this whenever a visitor asks about a specific project, then
summarizes the result in its own words rather than repeating the raw
data.

**Defined in:** [`lib/chat-tools.ts`](./lib/chat-tools.ts)
**Data source:** [`lib/projects-data.ts`](./lib/projects-data.ts)

**Input schema** (validated with [Zod](https://zod.dev)):

| Field | Type | Required | Description |
|---|---|---|---|
| `projectName` | `string` | No | Keyword to search for (e.g. `"capstone"`). Omitted → returns all projects. |

**Return shape:**

```ts
{
  found: boolean;
  projects: {
    slug: string;
    name: string;
    description: string;
    stack: string[];
    link?: string;
  }[];
}
```

If no project matches the given `projectName`, the tool throws an error
instead of returning an empty result, which the client renders as a
dedicated error state.

**Tool call UI states** — each of the four lifecycle states gets a
distinct visual treatment in [`components/ChatInterface.tsx`](./components/ChatInterface.tsx):

| State | What it means | Visual treatment |
|---|---|---|
| `input-streaming` | Model is composing the tool arguments | Dashed grey placeholder, "Preparing…" |
| `input-available` | Arguments ready, `execute()` is running | Blue spinner card, "Looking up…" |
| `output-available` | Tool succeeded | A real `ProjectCard` component per result |
| `output-error` | Tool threw an error | Red card with a warning icon and message |

**Why Gemini instead of Claude:** the assignment allows any LLM
provider, and Gemini's free tier was more practical for iterative
development during the internship (confirmed acceptable by the mentor
team). Switching providers only required changing the model import in
`route.ts` — the `streamText`/`useChat` pattern is identical either way.

## Signature hero shader (FE-AA3)

A fullscreen GLSL starfield shader rendered with Three.js as the
portfolio's background.

**What it does:** three layers of procedurally-placed stars (via a grid
+ pseudo-random hash, no texture assets) drift at different speeds and
densities to fake depth/parallax. The cursor gently pans the whole
field. A smooth three-stop gradient (slate-teal → pale teal → soft
pink, matching the site's own palette) forms the background.

**Uniforms used:** `u_time` (drives star drift and twinkle animation)
and `u_mouse` (parallax offset per layer).

**Reduced-motion fallback:** WebGL is skipped entirely when
`prefers-reduced-motion: reduce` is set. A static CSS `linear-gradient`
with the same three palette colours renders instead — same visual
identity, zero motion.

**Performance decisions:** `devicePixelRatio` is capped at 2 (no
visible benefit beyond that, saves GPU), and the render loop pauses via
the `visibilitychange` event when the tab is hidden.

## How AI tools built this

This project was built collaboratively with Claude across every stage:
streaming chat setup, tool calling, error/empty states, the send
button's animation states, the Vitest/Playwright test suite, the
Lighthouse/WAVE accessibility pass, the WebGL shader hero, and this
README. Concretely:

- **Debugging real errors, not guessing:** most fixes came from pasting
  actual terminal output, TypeScript errors, or WAVE/Lighthouse reports
  and asking for a specific diagnosis — e.g. a stuck-disabled send
  button bug and a broken `aria-label` on the error state were both
  found because writing the Vitest tests surfaced them, not from
  manual testing.
- **Iterating on visual/UX decisions myself:** the shader's palette,
  the chat card's translucency, and the hero layout went through
  several rounds of "I don't like this, change X" until they matched
  what I actually wanted — AI proposed the first pass, I directed the
  revisions.
- **Where I pushed back or made the call:** choosing to stop
  performance tuning at Lighthouse 89 (vs. chasing 90) once it was
  safely above the rubric's 80 minimum, and choosing to document the
  in-memory rate limiter's cross-instance limitation honestly instead
  of pretending it's production-grade.
- **What I did not just accept blindly:** every code change was tested
  in the browser (or via the test suite) before moving on, and several
  AI-authored snippets had bugs (e.g. an unremoved duplicate GLSL
  block, a stripped `<a>` tag while pasting) that had to be caught and
  fixed through that verification step, not assumed correct on the
  first try.

## Production hygiene

- **Rate limiting:** `lib/rate-limit.ts` caps each IP to 20 requests
  per hour, checked before the model is called, to prevent a stranger
  from draining API credits.
- **`maxDuration`:** the chat route caps at 30 seconds per request.
- **Known limitation:** the rate limiter is in-memory, so it resets on
  cold starts and doesn't share state across concurrent serverless
  instances. Adequate for a portfolio-scale project; a production app
  with real traffic would want a shared store (e.g. Upstash Redis).

## Testing

- 11 Vitest + React Testing Library component tests (`npm run test`),
  covering the send button's states and the chat across pending,
  streaming, error, and tool-result states — queried by role/label, not
  test ID.
- 1 Playwright end-to-end test (`npm run test:e2e`) covering the
  primary flow against a live dev server.
- CI runs both suites on every push/PR via GitHub Actions
  (`.github/workflows/tests.yml`).

## Accessibility & performance

Full audit in [`AUDIT.md`](./AUDIT.md). Summary: Lighthouse mobile
Performance 89 / Accessibility 100 / Best Practices 100 / SEO 100.
WAVE: 0 errors, 0 alerts.

## Browser support

Tested on Chrome (latest), Firefox (102+), and mobile Chrome. Firefox
versions older than 102 (released July 2022) lack native
`TransformStream` support required by the AI SDK's streaming
implementation and will show the app's error boundary instead of the
chat; this is expected on unsupported browsers, not a bug.

## Known limitations & future improvements

- Rate limiting is per-instance, not shared (see above).
- The `/projects` page is still a placeholder; the chat's project data
  currently lives in a small hardcoded dataset rather than the real
  projects page content.
- Safari/mobile Safari has not been manually verified on a physical
  device — only Chrome and Firefox were tested directly.
- Would add: a persisted conversation (localStorage) so a refresh
  mid-chat isn't a data-loss event, and a second tool to make the
  model's "choosing between tools" moment visible.

---

*Bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). Uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for [Geist](https://vercel.com/font).*


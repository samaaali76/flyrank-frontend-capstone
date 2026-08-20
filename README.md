This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## AI Chat Tools

The `/chat` page uses a streaming AI assistant (Google Gemini via the AI SDK)
that can call server-side tools to answer questions with real, structured
data instead of guessing.

### `getProjectInfo`

Looks up details about the portfolio's projects — used when a visitor asks
about a specific project or wants to see what's been built.

**Defined in:** [`lib/chat-tools.ts`](./lib/chat-tools.ts)
**Data source:** [`lib/projects-data.ts`](./lib/projects-data.ts)

**Input schema** (validated with [Zod](https://zod.dev)):

| Field         | Type              | Required | Description                                                              |
|---------------|-------------------|----------|----------------------------------------------------------------------------|
| `projectName` | `string`          | No       | Keyword to search for (e.g. `"capstone"`). Omitted → returns all projects. |

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
dedicated error state (see below).

### Tool call UI states

The chat renders each tool call through four distinct visual states,
handled in [`components/ChatInterface.tsx`](./components/ChatInterface.tsx):

| State              | What it means                          | Visual treatment                          |
|---------------------|-----------------------------------------|--------------------------------------------|
| `input-streaming`   | Model is composing the tool arguments   | Dashed grey placeholder, "Preparing…"      |
| `input-available`   | Arguments ready, `execute()` is running | Blue spinner card, "Looking up…"           |
| `output-available`  | Tool succeeded                          | A real `ProjectCard` component per result  |
| `output-error`      | Tool threw an error                     | Red card with a warning icon and message   |

## FE-AA3: Signature Hero Shader

A fullscreen GLSL starfield shader rendered with Three.js as the portfolio hero.

**What it does:** Three layers of procedurally placed stars drift at different speeds and densities to fake depth (parallax). The mouse gently pans the whole field. A smooth three-stop gradient (slate-teal → pale teal → soft pink) forms the background.

**Uniforms used:** `u_time` (drives star drift and twinkle animation) and `u_mouse` (parallax offset per layer).

**Reduced-motion fallback:** WebGL is skipped entirely when `prefers-reduced-motion: reduce` is set. A static CSS `linear-gradient` with the same three palette colours renders instead — same visual identity, zero motion.

**Performance decisions:** `devicePixelRatio` is capped at 2 (no visible benefit beyond that, saves GPU), and the render loop pauses via the `visibilitychange` event when the tab is hidden.
# Deployment Checklist

Signed off before final capstone submission.

## Pre-deploy

- [x] Environment variables set in Vercel (`GOOGLE_GENERATIVE_AI_API_KEY`),
      not committed to git
- [x] `.env.example` in the repo documents the required variable for
      anyone cloning the project
- [x] Rate limiting in place on the AI route (`lib/rate-limit.ts`) —
      20 requests/IP/hour, checked before calling the model
- [x] `maxDuration` set on the streaming route (30s cap)
- [x] Build passes locally (`npm run build`) with no errors
- [x] Test suite passes (`npm run test` — 11/11 — and
      `npm run test:e2e`)
- [x] CI (GitHub Actions) green on the branch being merged

## Deploy

- [x] Merged to `main` via pull request (not pushed directly)
- [x] Vercel auto-deploys `main` to production
- [x] Production URL manually verified after deploy: chat sends and
      receives a real streamed response, the tool call renders a
      project card, and the shader hero loads

## Post-deploy

- [x] Cross-browser check: Chrome and Firefox (see README's
      "Browser support" section for the one compatibility gap found
      and documented — old Firefox lacking `TransformStream`)
- [x] Mobile check: shader/chat both usable at phone width
- [x] Lighthouse mobile audit re-run against the production URL after
      the performance fix (see `AUDIT.md`)
- [x] WAVE accessibility check re-run against production (0 errors,
      0 alerts)

## Rollback plan

If a deploy breaks production:

1. Open the Vercel dashboard → the project → **Deployments**.
2. Find the last known-good deployment (identified by its commit
   message and the green "Ready" status).
3. Click the **⋯** menu on that deployment → **Promote to Production**.
   This instantly repoints the production domain at that build,
   without needing a new git push.
4. In parallel, revert or fix the offending commit on `main` so the
   next push doesn't reintroduce the same issue.

No database or persisted state is involved (the app has no backend
storage beyond the in-memory rate limiter), so a rollback has no data
migration concerns — it's purely swapping which static build serves
the domain.
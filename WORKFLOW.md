# FE-03: AI-Assisted Workflow Drill — Contact Form

## Feature
A contact form for the portfolio site, built twice using Cursor's AI agent: once with a single vague prompt (`round1-vague`), once with a precise, constraint-driven prompt (`round2-precise`).

## The Prompts

**Round 1 (vague):**
> "اعملي contact form فيها validation" (create a contact form with validation)

**Round 2 (precise):**
A multi-line prompt specifying exact fields (Name, Email, Message only), per-field inline error messages triggered on blur/submit, whitespace trimming, a proper email regex, no `alert()`, submit-button disabling during a simulated 1s send, `type="submit"`, a specific style direction (soft palette, rounded inputs, visible focus states), and an explicit instruction to write and run tests/verification before finishing.

## Correctness

Round 1 produced a form with 5 fields (Name, Email, **Phone, Subject** — neither requested, — Message), inline errors, an error summary panel, and a character counter. It is functional, but it invented scope beyond the one-sentence prompt.

Round 2 produced exactly the 3 requested fields, with the exact validation rules specified (min lengths, trimmed whitespace, proper email regex). Nothing extra was added. When tested manually in the browser:
- Submitting an empty form correctly showed "Name is required." under the Name field, with the input highlighted.
- Entering `test@domain` in the Email field correctly triggered "Please enter a valid email address." on blur.

Both behaviors matched the spec exactly. Round 1 was never manually verified in the browser — it may work, but no evidence was collected either way during this exercise.

## Accessibility

Both rounds actually turned out reasonably accessible (`for`/`id` labels, `aria-invalid`, `role="alert"`), which was unexpected for Round 1's one-sentence prompt. The reason: this project's `.cursorrules` file (from FE-01) already contains accessibility and BEM-naming requirements, and Cursor read that file automatically before generating anything. **Key finding: a "vague" prompt is not actually vague if the project already has strong persistent rules in `CLAUDE.md`/`.cursorrules` — those rules fill in gaps the prompt itself doesn't cover.**

## Edge Cases

Round 2 explicitly handled cases Round 1 never mentioned or tested:
- Whitespace-only input (e.g., a name of only spaces) is trimmed and correctly rejected.
- Double-submit prevention — the button disables and shows "Sending…" during the simulated network delay.
- A written test file (`contact-form-tests.md`) documents 7 categories of test cases: empty fields, invalid email formats, whitespace-only input, valid submission, double-click prevention, blur-timing behavior, and accessibility checks.

Round 1 has no equivalent documentation or verification of edge cases — whether it handles whitespace-only input or double submission is unknown without manually inspecting the code.

## Review Effort

Round 1 took less time to prompt (one sentence) but required more effort to review afterward — extra fields (Phone, Subject) had to be manually checked against the actual spec, and nothing was tested, so trust in the output was low without a manual code read.

Round 2 took longer to write (a multi-paragraph prompt) but almost no review effort was needed afterward: the AI itself explored the project, built the files, wrote a test checklist, and verified several cases directly in the browser before finishing. The upfront time cost in Round 2 was recovered by a much shorter, more confident review pass — consistent with the mentor tip that Round 2 "feels slower and is faster end-to-end."

## One AI Mistake Caught

In Round 1, the AI added a **Phone** and **Subject** field that were never requested in the prompt. This is a scope-creep mistake: a single vague prompt led the AI to guess at a "typical" contact form shape rather than asking or sticking to a minimal interpretation. This was only caught by comparing the file against what was actually asked for — nothing in Round 1's own output flagged the assumption.

## Conclusion

The precise prompt in Round 2 did not just produce "nicer" code — it produced a **verifiable and scoped** result: the exact fields requested, an explicit test artifact, and evidence (browser verification) that specific edge cases actually behave as intended. Round 1's speed advantage at prompt-time was offset by lower confidence in the result and undocumented scope decisions made silently by the AI.

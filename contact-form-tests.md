# Contact Form — Manual Test Checklist

Open `contact.html` in a browser before running these tests.

## 1. Empty fields (submit without filling)

| Step | Action | Expected |
|------|--------|----------|
| 1 | Click **Send Message** without touching any field | All three fields show inline errors: "Name is required.", "Email is required.", "Message is required." |
| 2 | No browser alert appears | Pass if only inline errors are shown |

## 2. Invalid email formats

| Input | Trigger | Expected error |
|-------|---------|----------------|
| `notanemail` | Blur email field | "Please enter a valid email address." |
| `missing@domain` | Blur | Same error |
| `@nodomain.com` | Blur | Same error |
| `user@` | Blur | Same error |
| `user@domain` | Blur | Same error (no TLD) |
| `user@domain.c` | Blur | Same error (TLD too short) |
| `valid@example.com` | Blur | No error |

## 3. Whitespace-only input

| Field | Input | Trigger | Expected |
|-------|-------|---------|----------|
| Name | `   ` (spaces only) | Blur | "Name is required." |
| Message | `          ` | Blur | "Message is required." |
| Name | ` a ` | Blur | "Name must be at least 2 characters." (trimmed length = 1) |

## 4. Valid submission

| Step | Action | Expected |
|------|--------|----------|
| 1 | Enter Name: `Jane Doe` | — |
| 2 | Enter Email: `jane@example.com` | — |
| 3 | Enter Message: `Hello, I would like to connect!` | — |
| 4 | Click **Send Message** | Button text changes to "Sending…" and button is disabled |
| 5 | Wait ~1 second | Green success message appears inline; form fields reset; button re-enables |
| 6 | No `alert()` dialog | Pass |

## 5. Double-click prevention

| Step | Action | Expected |
|------|--------|----------|
| 1 | Fill form with valid data | — |
| 2 | Click **Send Message** rapidly twice | Only one success message appears after 1s; button stays disabled until send completes |

## 6. Blur vs. initial load

| Step | Action | Expected |
|------|--------|----------|
| 1 | Reload page | No error messages visible |
| 2 | Tab through empty fields without submitting | Errors appear only after each field loses focus |

## 7. Accessibility

| Check | Expected |
|-------|----------|
| Each `<label>` has matching `for` / `id` | Name, Email, Message |
| Submit button | `type="submit"` |
| Invalid fields | `aria-invalid="true"` when error shown |

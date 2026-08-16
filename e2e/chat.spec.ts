import { test, expect } from '@playwright/test';

test('user can send a message and receive a streamed response', async ({ page }) => {
  await page.goto('/chat');

  // Empty state should be visible on first load.
  await expect(page.getByText(/ask me about samaa's projects/i)).toBeVisible();

  const input = page.getByPlaceholder(/type a message/i);
  const sendButton = page.getByRole('button', { name: /send message/i });

  await expect(sendButton).toBeDisabled();

  await input.fill('Hello');
  await expect(sendButton).toBeEnabled();
  await sendButton.click();

  // The user's own message should appear immediately.
  await expect(page.getByText('Hello', { exact: true })).toBeVisible();

  // The assistant's response should eventually appear, replacing the
  // empty state. We give this a generous timeout since it depends on
  // a real streaming response from the model.
  await expect(page.getByText('Assistant', { exact: true })).toBeVisible({ timeout: 20_000 });
  // The input should re-enable once streaming finishes.
  await expect(input).toBeEnabled({ timeout: 20_000 });
});
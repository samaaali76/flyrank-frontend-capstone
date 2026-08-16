import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SendButton } from './Sendbutton';

describe('SendButton', () => {
  it('is disabled when there is no input', () => {
    render(
      <SendButton
        isLoading={false}
        isDisabled={true}
        hasError={false}
        onStop={vi.fn()}
        onRetry={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled();
  });

  it('is enabled once there is input', () => {
    render(
      <SendButton
        isLoading={false}
        isDisabled={false}
        hasError={false}
        onStop={vi.fn()}
        onRetry={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled();
  });

  it('shows a stop control and calls onStop while loading', async () => {
    const onStop = vi.fn();
    const user = userEvent.setup();

    render(
      <SendButton
        isLoading={true}
        isDisabled={false}
        hasError={false}
        onStop={onStop}
        onRetry={vi.fn()}
      />
    );

    const button = screen.getByRole('button', { name: /stop generating/i });
    await user.click(button);

    expect(onStop).toHaveBeenCalledTimes(1);
  });

  it('shows a retry control and calls onRetry after an error', async () => {
    const onRetry = vi.fn();
    const user = userEvent.setup();

    render(
      <SendButton
        isLoading={false}
        isDisabled={false}
        hasError={true}
        onStop={vi.fn()}
        onRetry={onRetry}
      />
    );

    const button = screen.getByRole('button', { name: /retry sending message/i });
    await user.click(button);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
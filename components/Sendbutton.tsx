'use client';

import { useEffect, useRef, useState } from 'react';

type ButtonState = 'idle' | 'loading' | 'success' | 'error' | 'disabled';

interface SendButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
  hasError: boolean;
  onStop: () => void;
  onRetry: () => void;
}

export function SendButton({ isLoading, isDisabled, hasError, onStop, onRetry }: SendButtonProps) {  // Only the transient states (idle/success/error) need to be tracked
  // as local state — "loading" and "disabled" are always derivable
  // directly from props, so they can never get stuck.
  const [transientState, setTransientState] = useState<'idle' | 'success' | 'error'>('idle');
  const prevLoading = useRef(false);
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && prevLoading.current) {
      if (hasError) {
        setTransientState('error');
      } else {
        setTransientState('success');
        successTimer.current = setTimeout(() => {
          setTransientState('idle');
        }, 1200);
      }
    }
    prevLoading.current = isLoading;
  }, [isLoading, hasError]);

  // Priority: loading always wins the display, then a transient
  // success/error result, then disabled, then plain idle.
  const state: ButtonState = isLoading
    ? 'loading'
    : transientState !== 'idle'
    ? transientState
    : isDisabled
    ? 'disabled'
    : 'idle';

  const label = {
    idle: 'Send',
    disabled: 'Send',
    loading: '',
    success: '✓',
    error: 'Retry',
  }[state];

  return (
    <button
      type={isLoading || state === 'error' ? 'button' : 'submit'}
      onClick={isLoading ? onStop : state === 'error' ? onRetry : undefined}
      className={`send-btn send-btn--${state}`}
      disabled={state === 'disabled'}
      aria-label={isLoading ? 'Stop generating' : 'Send message'}
      aria-live="polite"
    >
      {state === 'loading' ? (
        <span className="send-btn__spinner" aria-hidden="true" />
      ) : (
        <span className="send-btn__label">{label}</span>
      )}
    </button>
  );
}
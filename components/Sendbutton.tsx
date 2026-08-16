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
  // Only "success" needs to be tracked as a transient local pulse —
  // it's not derivable from props alone (it has to fade after 1200ms).
  // "error" is derived directly from the hasError prop instead of a
  // transition, so mounting the button with hasError already true
  // (e.g. after a page refresh, or in isolated tests) still shows it.
  const [showSuccess, setShowSuccess] = useState(false);
  const prevLoading = useRef(false);
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && prevLoading.current && !hasError) {
      setShowSuccess(true);
      successTimer.current = setTimeout(() => {
        setShowSuccess(false);
      }, 1200);
    }
    prevLoading.current = isLoading;
  }, [isLoading, hasError]);

  // Priority: loading always wins the display, then a real error,
  // then a transient success pulse, then disabled, then plain idle.
  const state: ButtonState = isLoading
    ? 'loading'
    : hasError
    ? 'error'
    : showSuccess
    ? 'success'
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
      aria-label={
          isLoading ? 'Stop generating' : state === 'error' ? 'Retry sending message' : 'Send message'
      }
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
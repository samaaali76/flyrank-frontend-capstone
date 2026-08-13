'use client';

import { useEffect } from 'react';

export default function ChatError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to the console for debugging; a real app might send this
    // to an error-tracking service instead.
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-lg flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="text-2xl font-bold text-neutral-900">
        Something went wrong
      </h1>
      <p className="text-neutral-600">
        The chat couldn&apos;t load. This is usually temporary — try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
      >
        Try again
      </button>
    </section>
  );
}
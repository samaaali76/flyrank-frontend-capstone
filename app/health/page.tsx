async function getHealthData(): Promise<{ ok: boolean; message: string }> {
  try {
    const response = await fetch('https://api.github.com/zen', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const text = await response.text();
    return { ok: true, message: text };
  } catch {
    return {
      ok: false,
      message: 'Could not reach the external API right now.',
    };
  }
}

export default async function HealthPage() {
  const { ok, message } = await getHealthData();

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-3xl font-bold text-neutral-900">Health Check</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Confirms the app can fetch live data at build/request time.
      </p>

      <div className="mt-8 rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              ok ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span className="text-sm font-semibold text-neutral-900">
            Status: {ok ? 'OK' : 'Error'}
          </span>
        </div>

        <p className="mt-4 text-neutral-600">
          {ok ? (
            <>
              <span className="font-medium text-neutral-800">
                Fetched message:
              </span>{' '}
              &ldquo;{message}&rdquo;
            </>
          ) : (
            message
          )}
        </p>
      </div>
    </section>
  );
}

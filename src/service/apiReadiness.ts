// Share one readiness check across concurrent requests. Recheck on demand after
// inactivity so a tab left open can recover when the free backend goes to sleep.
export function createApiReadiness(check: () => Promise<unknown>) {
  const idleTimeout = 14 * 60 * 1000;
  let pending: Promise<void> | null = null;
  let lastActivity: number | null = null;

  const markActivity = () => {
    lastActivity = Date.now();
  };

  const waitUntilReady = (): Promise<void> => {
    if (pending) return pending;
    if (lastActivity !== null && Date.now() - lastActivity < idleTimeout) {
      return Promise.resolve();
    }

    pending = Promise.resolve()
      .then(check)
      .then(markActivity)
      .finally(() => {
        // A failed check must not permanently block later requests.
        pending = null;
      });
    return pending;
  };

  return { waitUntilReady, markActivity };
}

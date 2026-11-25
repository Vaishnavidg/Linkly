import { useCallback, useEffect, useState } from "react";

import { getUserUrls } from "../api/urls";
import type { ShortUrl } from "../types/index";

/** Loads the signed-in user's short URLs. Call `refresh()` after creating one. */
export function useUserUrls(userId: string | undefined) {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    (async () => {
      try {
        const result = await getUserUrls();
        if (cancelled) return;
        setUrls(result.data ?? []);
        setError("");
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load your links. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId, refreshKey]);

  const refresh = useCallback(() => setRefreshKey((key) => key + 1), []);

  return { urls, loading, error, refresh };
}

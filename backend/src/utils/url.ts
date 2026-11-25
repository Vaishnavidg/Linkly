/**
 * Normalises raw input into an absolute http(s) URL, or returns null when unusable.
 * Mirrors the frontend's `normalizeUrl` so both sides accept the same input.
 */
export function normalizeHttpUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    return null;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  if (!url.hostname.includes(".") || url.hostname.endsWith(".")) return null;

  return url.toString();
}

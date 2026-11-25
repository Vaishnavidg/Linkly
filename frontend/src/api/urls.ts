import { normalizeUrl } from "../lib/url";
import { API_URL } from "./config";

const authHeader = (): Record<string, string> => {
  // Read at call time: a module-level read would run before sign-in and stay null.
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

async function parseResponse(response: Response, fallbackMessage: string) {
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || fallbackMessage);
  return data;
}

function assertValidUrl(url: string) {
  if (!url) throw new Error("Please enter a URL.");
  if (!normalizeUrl(url)) throw new Error("Please enter a valid URL, e.g. https://example.com");
}

/** Shortens a URL without being signed in. */
export const getShortUrlApiUrlWithoutSignIn = async (url: string) => {
  assertValidUrl(url);
  const response = await fetch(`${API_URL}/urls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: normalizeUrl(url) }),
  });
  return parseResponse(response, "Failed to shorten URL");
};

/** Shortens a URL and saves it to the signed-in user's account. */
export const getShortUrlApiUrl = async (url: string) => {
  assertValidUrl(url);
  const response = await fetch(`${API_URL}/url`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ url }),
  });
  return parseResponse(response, "Failed to shorten URL");
};

/** Fetches the signed-in user's short URLs. */
export const getUserUrls = async () => {
  const response = await fetch(`${API_URL}/user-urls`, {
    method: "GET",
    headers: { "Content-Type": "application/json", ...authHeader() },
  });
  return parseResponse(response, "Token is not valid");
};

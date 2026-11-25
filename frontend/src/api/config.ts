/**
 * Base URL of the Linkly backend (set VITE_BACKEND_API_URL in .env).
 * Trailing slashes are stripped so `${API_URL}/path` never produces `//path`.
 */
export const API_URL: string = (import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000").replace(/\/+$/, "");

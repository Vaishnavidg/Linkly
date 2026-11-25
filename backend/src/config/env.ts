import "dotenv/config";

const DEFAULT_CLIENT_ORIGINS = ["https://linkly-olive.vercel.app", "http://localhost:5173"];

const MONGO_URI = process.env.MONGO_URI ?? "";

/** Centralised, typed access to environment variables. */
export const env = {
  PORT: Number(process.env.PORT) || 8000,
  MONGO_URI,
  // Prefer a dedicated secret; fall back to MONGO_URI so existing tokens keep working.
  JWT_SECRET: process.env.JWT_SECRET || MONGO_URI,
  /** Comma-separated list of allowed browser origins (CORS). */
  CLIENT_ORIGINS: process.env.CLIENT_ORIGINS
    ? process.env.CLIENT_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
    : DEFAULT_CLIENT_ORIGINS,
};

/** Throws when a required variable is missing. Call once at startup. */
export function assertEnv(): void {
  if (!env.MONGO_URI) throw new Error("MONGO_URI is missing from environment variables");
  if (!env.JWT_SECRET) throw new Error("JWT_SECRET (or MONGO_URI) is missing from environment variables");
}

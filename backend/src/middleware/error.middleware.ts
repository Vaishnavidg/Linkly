import type { ErrorRequestHandler, RequestHandler } from "express";

import { HttpError } from "../utils/httpError.js";

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ message: "Route not found" });
};

/** Last middleware: turns thrown errors into safe JSON responses. */
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ message: err.message });
    return;
  }

  // Malformed JSON bodies are reported by express.json() with a 4xx status.
  if (typeof err?.status === "number" && err.status >= 400 && err.status < 500) {
    res.status(err.status).json({ message: "Invalid request" });
    return;
  }

  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
};

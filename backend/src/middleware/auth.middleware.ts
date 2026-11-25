import type { NextFunction, Response } from "express";

import type { AuthRequest } from "../types/auth.js";
import { HttpError } from "../utils/httpError.js";
import { verifyJwt } from "../utils/jwt.js";

/** Requires `Authorization: Bearer <jwt>` and exposes the user id as `req.userId`. */
export const verifyToken = (req: AuthRequest, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new HttpError(401, "Authentication token required");
  }

  try {
    req.userId = verifyJwt(authHeader.slice("Bearer ".length)).userId;
  } catch {
    throw new HttpError(401, "Invalid or expired token");
  }

  next();
};

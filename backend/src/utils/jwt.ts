import jwt, { type SignOptions } from "jsonwebtoken";

import { env } from "../config/env.js";

const TOKEN_LIFETIME: SignOptions["expiresIn"] = "20h";

export interface JwtPayload {
  userId: string;
}

export const generateToken = (userId: string): string =>
  jwt.sign({ userId } satisfies JwtPayload, env.JWT_SECRET, { expiresIn: TOKEN_LIFETIME });

/** Verifies a token and returns its payload. Throws if invalid or expired. */
export const verifyJwt = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, env.JWT_SECRET);
  if (typeof decoded === "string" || typeof decoded.userId !== "string") {
    throw new Error("Malformed token payload");
  }
  return { userId: decoded.userId };
};

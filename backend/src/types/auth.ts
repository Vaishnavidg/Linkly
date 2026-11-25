import type { Request } from "express";

/** A request that passed `verifyToken`; `userId` comes from the verified JWT. */
export interface AuthRequest extends Request {
  userId?: string;
}

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/";

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
}


export interface AuthRequest extends Request {
    userId?: string;
}

export const verifyToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authentication token required"
            });
        }

        const token = authHeader.split(" ")[1];

        console.log("Verifying token:", token);

        const decoded = jwt.verify(
            token,
            MONGO_URI
        ) as JwtPayload;

        console.log("Decoded token:", decoded);

        req.userId = decoded.userId;
        console.log("Token verified, userId:", req.userId);

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
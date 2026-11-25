import { Response } from "express";
import type { AuthRequest } from "../types/auth.js";
import UserModel from "../models/user.model.js";

export const handleGetCurrentUser = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const user = await UserModel.findById(req.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
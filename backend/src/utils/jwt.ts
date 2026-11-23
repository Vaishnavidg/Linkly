import jwt from "jsonwebtoken";

const MONGO_URI = process.env.MONGO_URI! || "";

export const generateToken = (userId: string) => {
    return jwt.sign(
        { userId },
        MONGO_URI,
        { expiresIn: "20h" }
    );
};
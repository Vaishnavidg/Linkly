import jwt from "jsonwebtoken";

const MONGO_URI = process.env.MONGO_URI! || "mongodb://localhost:27017/";

export const generateToken = (userId: string) => {
    return jwt.sign(
        { userId },
        MONGO_URI,
        { expiresIn: "20h" }
    );
};
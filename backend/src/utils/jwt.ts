import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET! || "mongodb://localhost:27017/";

export const generateToken = (userId: string) => {
    return jwt.sign(
        { userId },
        JWT_SECRET,
        { expiresIn: "20h" }
    );
};
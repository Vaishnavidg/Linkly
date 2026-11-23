import { z } from "zod";

export const signupSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must contain at least 2 characters"),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Please enter a valid email"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(72, "Password cannot exceed 72 characters")
        .regex(/[A-Z]/, "At least one uppercase letter required")
        .regex(/[a-z]/, "At least one lowercase letter required")
        .regex(/[0-9]/, "At least one number required")
});

export type SignupFormData = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Please enter a valid email address"),

    password: z
        .string()
        .min(1, "Password is required")
});

export type SigninFormData = z.infer<typeof signinSchema>;
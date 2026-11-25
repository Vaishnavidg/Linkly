import type { Request, Response } from "express";

import * as userService from "../services/user.service.js";
import type { AuthRequest } from "../types/auth.js";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const result = await userService.registerUser({ name, email, password });
  res.status(201).json({ message: "User created successfully", ...result });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await userService.authenticateUser(email, password);
  res.status(200).json({ message: "Login successful", ...result });
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  const user = await userService.getUserById(req.userId!);
  res.status(200).json({ user });
};

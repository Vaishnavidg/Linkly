import bcrypt from "bcrypt";

import UserModel from "../models/user.model.js";
import { HttpError } from "../utils/httpError.js";
import { generateToken } from "../utils/jwt.js";

const SALT_ROUNDS = 10;

interface PublicUser {
  id: string;
  name: string;
  email: string;
}

const toPublicUser = (user: { id: string; name: string; email: string }): PublicUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

export async function registerUser(input: { name: string; email: string; password: string }) {
  if (await UserModel.exists({ email: input.email })) {
    throw new HttpError(409, "User already exists");
  }

  const user = await UserModel.create({
    name: input.name,
    email: input.email,
    password: await bcrypt.hash(input.password, SALT_ROUNDS),
  });

  return { token: generateToken(user.id), user: toPublicUser(user) };
}

export async function authenticateUser(email: string, password: string) {
  const user = await UserModel.findOne({ email }).select("+password");
  // Same message for unknown email and wrong password, so accounts can't be probed.
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new HttpError(401, "Invalid credentials");
  }

  return { token: generateToken(user.id), user: toPublicUser(user) };
}

export async function getUserById(userId: string): Promise<PublicUser> {
  const user = await UserModel.findById(userId);
  if (!user) throw new HttpError(404, "User not found");
  return toPublicUser(user);
}

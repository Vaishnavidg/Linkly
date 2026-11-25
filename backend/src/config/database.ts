import mongoose from "mongoose";

/** Connects to MongoDB. Rejects when the connection cannot be established. */
export async function connectToDatabase(uri: string): Promise<void> {
  await mongoose.connect(uri);
}

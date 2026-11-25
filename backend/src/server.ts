import app from "./app.js";
import { assertEnv, env } from "./config/env.js";
import { connectToDatabase } from "./config/database.js";

const startServer = async () => {
  try {
    assertEnv();
    await connectToDatabase(env.MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(env.PORT, () => {
      console.log(`Server listening on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

void startServer();

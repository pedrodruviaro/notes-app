import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import process from "process";
import { dbConnection } from "./libs/db.js";
import { router as userRouter } from "./routes/user.routes.js";
import { router as noteRouter } from "./routes/note.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());

app.get("/status", (_, res) => {
  const dbStates = mongoose.STATES;
  const dbState = Object.keys(dbStates).find(
    (key) => dbStates[key] === mongoose.connection.readyState,
  );

  res.status(200).json({
    state: "up",
    uptime: process.uptime(),
    timestamp: Date.now(),
    dbState,
  });
});

app.use("/api/v1", userRouter);
app.use("/api/v1/notes", noteRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    const mongo = await dbConnection(mongoUri);

    if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
      console.log(`Server running on port ${PORT} - ${mongo.connection.name}`);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});

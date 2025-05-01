import mongoose from "mongoose";
import process from "process";

export async function dbConnection(mongoUri) {
  try {
    const mongo = await mongoose.connect(mongoUri);
    return mongo;
  } catch (error) {
    console.log("Error connecting to DB: ", error);
    process.exit(1);
  }
}

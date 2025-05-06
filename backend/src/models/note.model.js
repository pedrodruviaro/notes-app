import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "UserId is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    type: {
      type: String,
      enum: {
        values: ["frontend", "backend", "fullstack"],
        message:
          "Invalid type. Must be one of: frontend, backend, or fullstack",
      },
      required: [true, "Type is required"],
    },
  },
  { timestamps: true },
);

export const Note = mongoose.model("Note", noteSchema);

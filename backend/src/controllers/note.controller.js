import asyncHandler from "express-async-handler";
import { Note } from "../models/note.model.js";
import { HttpError } from "../utils/httpError.js";

export const getAll = asyncHandler(async (req, res) => {
  // paginacao, filtros por crescente ou descrescente, filtro por type

  const user = req.user;
  // const query = req.query;

  const [total, notes] = await Promise.all([
    Note.countDocuments({ userId: user.id }),
    Note.find({ userId: user.id }),
  ]);

  res.status(200).json({ total, notes });
});

export const getOne = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  const note = await Note.findOne({ userId: user.id, _id: id });

  if (!note) {
    throw new HttpError("Note not found", 404);
  }

  res.status(200).json({ note });
});

export const create = asyncHandler(async (req, res) => {
  const user = req.user;
  const { title, content, type } = req.body;

  const note = await Note.create({ userId: user.id, title, content, type });

  res.status(201).json({ note });
});

export const update = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { title, content, type } = req.body;

  const note = await Note.findOneAndUpdate(
    { userId: user.id, _id: id },
    { title, content, type },
    { new: true, runValidators: true },
  );

  if (!note) {
    throw new HttpError("Note not found", 404);
  }

  res.status(200).json({ note });
});

export const remove = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  const note = await Note.findOneAndDelete({ userId: user.id, _id: id });

  if (!note) {
    throw new HttpError("Note not found", 404);
  }

  res.status(200).json({ note });
});

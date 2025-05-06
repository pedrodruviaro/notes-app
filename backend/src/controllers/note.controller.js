import expressAsyncHandler from "express-async-handler";

export const getAll = expressAsyncHandler(async (req, res) => {
  res.send("All notes");
});

export const getOne = expressAsyncHandler(async (req, res) => {
  res.send("one note");
});

export const create = expressAsyncHandler(async (req, res) => {
  res.send("create note");
});

export const update = expressAsyncHandler(async (req, res) => {
  res.send("update note");
});

export const remove = expressAsyncHandler(async (req, res) => {
  res.send("remove note");
});

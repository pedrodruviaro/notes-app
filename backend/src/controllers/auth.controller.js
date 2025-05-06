import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import process from "node:process";
import { User } from "../models/user.model.js";
import { doesPasswordsMatch, hashPassword } from "../utils/password.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  if (!(await doesPasswordsMatch(password, user.password))) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 * 60 },
  );

  res.status(200).json({ token });
});

export const register = asyncHandler(async (req, res) => {
  const { fullname, username, email, password } = req.body;

  const doesUserExists = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (doesUserExists) {
    res.status(400);
    throw new Error("Username or email already taken");
  }

  const hashedPassword = await hashPassword(password);

  const createdUser = await User.create({
    fullname,
    email,
    username,
    password: hashedPassword,
  });

  res.status(200).json({
    fullname,
    username,
    email,
    createdAt: createdUser.createdAt,
    updatedAt: createdUser.updatedAt,
  });
});

// export const forgotPassword = asyncHandler(async (req, res) => {});

// export const resetPassword = asyncHandler(async (req, res) => {});

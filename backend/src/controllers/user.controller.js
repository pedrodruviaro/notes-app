import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";
import { hashPassword } from "../utils/password.js";

export const updateProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  let { fullname, password, bio, jobtitle } = req.body;

  if (password) {
    const hashedPassword = await hashPassword(password);
    password = hashedPassword;
  }

  const updatedUser = await User.findByIdAndUpdate(
    user.id,
    {
      fullname,
      password,
      bio,
      jobtitle,
    },
    { new: true },
  );

  if (!updatedUser) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const userObj = updatedUser.toObject();
  delete userObj.password;

  res.status(200).json({ user: userObj });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  const userInfos = await User.findById(user.id);

  if (!userInfos) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const userObject = userInfos.toObject();
  delete userObject.password;

  res.json({
    user: userObject,
  });
});

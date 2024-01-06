import asyncHandler from "express-async-handler";

export const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "register user" });
});

export const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "login user" });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "logout user" });
});

export const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "update user" });
});

export const deleteUser = asyncHandler(async (req, res) => {
  res.status(200);
  throw new Error("ajith said to show the error");
  res.status(200).json({ message: "delete user" });
});

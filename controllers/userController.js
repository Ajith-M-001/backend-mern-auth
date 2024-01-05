import asyncHandler from "express-async-handler";

export const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "register user" });
});

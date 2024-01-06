import asyncHandler from "express-async-handler";
import userModel from "../model/userModel.js";
import bcryptjs from "bcryptjs";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Required fields cannot be empty");
  }

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email Already Exists! Please Login");
  }
  const hashedpassword = await bcryptjs.hash(password, 10);
  const user = new userModel({
    name,
    email,
    password: hashedpassword,
  });

  const newUser = await user.save();

  if (newUser) {
    res.status(201).json({ message: "User Registered Successfully" });
  } else {
    res.status(400);
    throw new Error("Unable to register user");
  }
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

import asyncHandler from "express-async-handler";
import userModel from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";

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
  const { email, password } = req.body;

  const userExists = await userModel.findOne({ email });
  if (!userExists) {
    res.status(401);
    throw new Error("Invalid Email or password");
  }

  const isPasswordMatched = await bcryptjs.compare(
    password,
    userExists.password
  );

  if (!isPasswordMatched) {
    res.status(401);
    throw new Error("Invalid Email or password");
  }

  const token = generateToken(res, userExists._id);
  res.status(200).json({
    token,
    _id: userExists._id,
    name: userExists.name,
    email: userExists.email,
    image: userExists.image,
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "user Logged out Successfully" });
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.image = req.body.image || user.image;

    if (req.body.password) {
      const hashedpassword = await bcryptjs.hash(req.body.password, 10);
      user.password = hashedpassword;
    }

    const updatedUser = await user.save();

    if (updatedUser) {
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
      });
    }
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);

  if (user) {
    res.clearCookie("jwt");
    await userModel.deleteOne({ _id: user._id });
    res.status(200).json({ message: "user deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

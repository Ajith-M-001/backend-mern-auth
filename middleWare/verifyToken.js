import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import userModel from "../model/userModel.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decoded.userId);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("unauthorzed - Invalid token");
    }
  } else {
    res.status(401);
    throw new Error("unauthorzed - No token");
  }
});

export default verifyToken;

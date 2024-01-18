import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRouter from "./Routes/userRouter.js";
import { errorHandler, notFound } from "./middleWare/errorHandlers.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/users", userRouter);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "..", "frontend", "dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server started");
  });
}

app.use(notFound);
app.use(errorHandler);
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error while connecting to mongodb database ${error.message}`);
  }
};

startServer();

import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server started");
});

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

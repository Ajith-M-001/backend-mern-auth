import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const databaseUrl = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(databaseUrl);
    console.log(`connected to mongodb atlas database`);
  } catch (error) {
    console.log(`Failed to coonect to mongodb database ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

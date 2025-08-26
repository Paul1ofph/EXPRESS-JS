import mongoose from "mongoose";

// Connect to MongoDb
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDb Successfully!");
  } catch (err) {
    console.error("MongoDb connection error:", err);
  }
};

export default connectDB;

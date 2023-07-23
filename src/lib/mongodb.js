import mongoose from "mongoose";

const { MONGODB_URI, DATABASE_NAME } = process.env;

if (!MONGODB_URI) throw new Error("Invalid env variable: MONGODB_URI");

export default async function connectToMongoDB() {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI, {
      dbName: DATABASE_NAME,
    });

    if (connection.readyState === 1) {
      console.log("Connected to MongoDB");
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

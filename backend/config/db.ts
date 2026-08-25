import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  await mongoose.connect(process.env.MONGO_DB_URL as string)
    .then(() => console.log("Connected to database"));
};

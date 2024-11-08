import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://247market:247market@cluster0.h85rf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
      .then(() => console.log('Connected to database'))
};

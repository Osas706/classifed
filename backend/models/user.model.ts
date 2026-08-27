import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  displayImage?: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  phoneNumber?: string;
  country?: string;
  state?: string;
  bookmarkedAds: any[];
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    displayImage: { type: String, required: false },
    password: { type: String, required: true },
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: Date, required: false },
    phoneNumber: { type: String, required: false },
    country: { type: String, required: false },
    state: { type: String, required: false },
    bookmarkedAds: { type: Array, default: [] },
    status: { type: String, enum: ["submitted", "verified"], default: "submitted" },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.user || mongoose.model("user", userSchema);

export default UserModel;

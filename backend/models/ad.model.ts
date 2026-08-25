import mongoose, { Document } from "mongoose";

export interface IAd extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  lat?: number;
  long?: number;
  category?: string;
  condition?: string;
  price?: number;
  terms?: string;
  adImage?: string;
  displayImage?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const adSchema = new mongoose.Schema<IAd>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: false },
    lat: { type: Number, required: false },
    long: { type: Number, required: false },
    category: { type: String, required: false },
    condition: { type: String, required: false },
    price: { type: Number, required: false },
    terms: { type: String, required: false },
    adImage: { type: String, required: false },
    displayImage: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    country: { type: String, required: false },
    state: { type: String, required: false },
  },
  { timestamps: true }
);

const AdModel = mongoose.models.ad || mongoose.model<IAd>("ad", adSchema);

export default AdModel;

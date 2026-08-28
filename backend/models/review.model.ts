import mongoose, { Document } from "mongoose";

export interface IReview extends Document {
  ad: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  reviewerName: string;
  user?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    ad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ad",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: false },
    reviewerName: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
  },
  { timestamps: true }
);

const ReviewModel =
  mongoose.models.review || mongoose.model<IReview>("review", reviewSchema);

export default ReviewModel;

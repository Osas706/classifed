import mongoose from "mongoose";
import ReviewModel from "../models/review.model.js";
import type { Response } from "express";

// shared aggregate helper: average rating + count for an ad
export const getRatingSummary = async (adId: string) => {
  const agg = await ReviewModel.aggregate([
    { $match: { ad: new mongoose.Types.ObjectId(adId) } },
    {
      $group: {
        _id: "$ad",
        averageRating: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  const summary = agg[0];
  return {
    averageRating: summary ? Math.round(summary.averageRating * 10) / 10 : 0,
    count: summary ? summary.count : 0,
  };
};

//add review
export const addReview = async (req: any, res: Response) => {
  const { ad, rating, comment, reviewerName, user } = req.fields || req.body;

  const numericRating = Number(rating);

  if (!ad) {
    return res.status(400).json({ success: false, message: "Ad is required" });
  }

  if (!numericRating || numericRating < 1 || numericRating > 5) {
    return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
  }

  if (!reviewerName || !String(reviewerName).trim()) {
    return res.status(400).json({ success: false, message: "Reviewer name is required" });
  }

  try {
    const review = new ReviewModel({
      ad,
      rating: numericRating,
      comment,
      reviewerName: String(reviewerName).trim(),
      user: user || undefined,
    });

    await review.save();

    res.status(201).json({ success: true, message: "Review added", review });
  } catch (error) {
    console.log(error, "Error in addReview controller");
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};

//get reviews for an ad
export const getReviewsForAd = async (req: any, res: Response) => {
  const { adId } = req.params;

  try {
    const reviews = await ReviewModel.find({ ad: adId }).sort({ createdAt: -1 });
    const summary = await getRatingSummary(adId);

    res.status(200).json({
      success: true,
      data: reviews,
      averageRating: summary.averageRating,
      count: summary.count,
    });
  } catch (error) {
    console.log(error, "Error in getReviewsForAd controller");
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};

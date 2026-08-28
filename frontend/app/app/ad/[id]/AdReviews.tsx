"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { RiStarFill, RiChatQuoteLine } from "react-icons/ri";
import useStore from "../../../../src/store/useStore";
import { formatAdDate } from "../../../../src/utils/utils";
import StarRating from "./StarRating";

interface AdReviewsProps {
  adId: string;
}

interface Review {
  _id: string;
  rating: number;
  comment?: string;
  reviewerName: string;
  createdAt?: string;
}

const AdReviews = ({ adId }: AdReviewsProps) => {
  const { url, user } = useStore();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [reviewerName, setReviewerName] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await axios.get(`${url}/api/reviews/ad/${adId}`);
      setReviews(res?.data?.data || []);
      setAverageRating(res?.data?.averageRating || 0);
      setCount(res?.data?.count || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [url, adId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    const fetchName = async () => {
      if (!user) return;

      try {
        const res = await axios.get(`${url}/api/user/${user}`);
        const { firstName, lastName } = res?.data || {};
        const fullName = [firstName, lastName].filter(Boolean).join(" ");
        if (fullName) setReviewerName(fullName);
      } catch (error) {
        console.log(error);
      }
    };

    fetchName();
  }, [user, url]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      toast.error("Please select a star rating");
      return;
    }

    if (!reviewerName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("ad", adId);
      formData.append("rating", String(rating));
      formData.append("comment", comment);
      formData.append("reviewerName", reviewerName.trim());
      if (user) formData.append("user", user);

      const res = await axios.post(`${url}/api/reviews/add`, formData);

      toast.success(res?.data?.message || "Review added");
      setRating(0);
      setComment("");
      fetchReviews();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative pt-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/15 dark:via-white/15 to-transparent" />

      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold font-sora text-navy dark:text-white">Reviews</h2>
        <span className="flex-1 h-px bg-gradient-to-r from-navy/10 dark:from-white/10 to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-white dark:bg-surface-dark border border-navy/15 dark:border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-2xl font-bold text-navy dark:text-white">
              {averageRating > 0 ? averageRating.toFixed(1) : "—"}
              <RiStarFill className="text-amber-400 text-xl" />
            </div>
            <div className="h-8 w-px bg-navy/10 dark:bg-white/10" />
            <p className="text-sm text-muted dark:text-white/60">
              {count > 0 ? `${count} review${count === 1 ? "" : "s"}` : "No reviews yet — be the first"}
            </p>
          </div>

          {!loading && reviews.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-10 text-navy/60 dark:text-white/50">
              <RiChatQuoteLine className="text-3xl" />
              <p className="text-sm">No reviews for this ad yet.</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white dark:bg-surface-dark border border-navy/15 dark:border-white/10 rounded-2xl p-5"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <p className="font-semibold text-navy dark:text-white capitalize">{review.reviewerName}</p>
                  <span className="text-xs text-muted dark:text-white/50 shrink-0">{formatAdDate(review.createdAt)}</span>
                </div>
                <StarRating value={review.rating} readOnly size={16} />
                {review.comment && (
                  <p className="text-sm text-navy-ink dark:text-white/70 leading-relaxed mt-2">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-navy dark:bg-surface-dark border border-navy dark:border-white/10 rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold font-sora text-white">Leave a review</h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-white/70">Your rating</span>
              <StarRating value={rating} onChange={setRating} size={26} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="reviewerName" className="text-xs font-semibold text-white/70">
                Your name
              </label>
              <input
                id="reviewerName"
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="e.g. Jane Doe"
                required
                className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="comment" className="text-xs font-semibold text-white/70">
                Comment (optional)
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Share your experience with this seller or item"
                className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-accent text-navy font-semibold text-sm px-5 py-2.5 hover:bg-accent/90 transition disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdReviews;

import { useState, useEffect } from "react";
import axios from "axios";
import { ReviewDataTypes } from "@/types/review.ts";

export const useReviews = (userId?: string) => {
  const [reviewData, setReviewData] = useState<ReviewDataTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAllReviews = async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      const res = await axios.get(`/api/v1/review/getReviewByUserId/${userId}`);
      setReviewData(res.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to load reviews. Please try again later.");
      console.error("Error fetching reviews:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllReviews();
  }, [userId]);

  return { reviewData, isLoading, error, getAllReviews };
};

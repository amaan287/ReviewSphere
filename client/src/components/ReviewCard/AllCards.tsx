import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ReviewCard from "./ReviewCard";

export interface ReviewDataTypes {
  id: string;
  companyName: string;
  role: string;
  responsibilities: string;
  location: string;
  feedback: string;
  reviewType: "NOT_GOOD_NOT_BAD" | string;
  rating: number;
  hoursPerWeek: number;
  salaryPerWeek: string;
  currency: string;
  createdAt: string;
  userId: string;
}

const SkeletonCard = () => (
  <Card className="p-4 space-y-4">
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-20 w-full" />
    <div className="flex gap-2">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-16" />
    </div>
  </Card>
);

export default function AllCards() {
  const [reviewData, setReviewData] = useState<ReviewDataTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getAllReviews() {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/v1/review/getReviews");
      setReviewData(res.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to load reviews. Please try again later.");
      console.error("Error fetching reviews:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllReviews();
  }, []);

  // Show loading skeletons
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 p-4">
        {[...Array(8)].map((_, index) => (
          <SkeletonCard key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="text-red-500 text-center mb-4">{error}</div>
        <button
          onClick={() => getAllReviews()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Show empty state
  if (reviewData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-gray-500 text-center">No reviews found.</p>
      </div>
    );
  }

  // Show reviews grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 p-4">
      {reviewData.map((review) => (
        <ReviewCard key={review.id} reviewDataProps={review} />
      ))}
    </div>
  );
}

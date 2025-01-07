import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ReviewCard from "./ReviewCard";
import { useAllReviews } from "@/hooks/useAllReviews";
import { ErrorState } from "../Profile/ErrorState";

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
  const { reviewData, isLoading, error, getAllReviews } = useAllReviews();

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
    return ErrorState({ error, retry: getAllReviews });
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

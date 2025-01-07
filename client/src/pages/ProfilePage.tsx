import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import { RootState } from "@/redux/store";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Drawer } from "vaul";
import { logoutSuccess } from "@/redux/user/userSlice";

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
  <Card className="space-y-4 p-4">
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-20 w-full" />
    <div className="flex gap-2">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-16" />
    </div>
  </Card>
);

const ErrorState = ({ error, retry }: { error: string; retry: () => void }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <div className="mb-4 text-center text-red-500">{error}</div>
    <button
      onClick={retry}
      className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
    >
      Try Again
    </button>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center p-8">
    <p className="text-center text-gray-500">No reviews found.</p>
  </div>
);

export default function ProfilePage() {
  const [reviewData, setReviewData] = useState<ReviewDataTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const numberOfReviews = reviewData.length;

  const dispatch = useDispatch();
  function logOut() {
    axios.post(`/api/v1/auth/logout`);
    dispatch(logoutSuccess());
  }

  const LoadingState = () => (
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <SkeletonCard key={`skeleton-${index}`} />
      ))}
    </div>
  );
  const getAllReviews = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `/api/v1/review/getReviewByUserId/${currentUser?.id}`
      );
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
  }, [currentUser?.id]);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} retry={getAllReviews} />;
  if (reviewData.length === 0) return <EmptyState />;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="mt-12 flex flex-col gap-4">
      {/* Header Section */}
      <div className="relative overflow-hidden px-8 py-8 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 shadow-xl rounded-xl">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
        </div>

        {/* Content container */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* User avatar or fallback */}
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
              <Drawer.Root>
                <DrawerTrigger>
                  <Settings className="w-6 h-6 text-white/80" />
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>You want to logout </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button onClick={logOut} variant={"destructive"}>
                      Logout
                    </Button>
                    <DrawerClose>
                      <Button variant={"link"}>Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer.Root>
            </div>

            {/* User name with enhanced typography */}
            <h1 className="text-4xl font-bold text-white tracking-tight">
              {currentUser?.name}
              <span className="block text-sm font-normal text-white/80 mt-1">
                Member since{" "}
                {currentUser
                  ? formatDate(currentUser.createdAt) || "Today"
                  : ""}
              </span>
            </h1>
          </div>

          {/* Reviews counter with animated hover effect */}
          <div className="group">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center justify-center min-w-[3rem] bg-white/10 backdrop-blur-sm text-white font-bold px-4 py-2 rounded-full transition-all duration-300 group-hover:bg-white group-hover:text-blue-600">
                {numberOfReviews}
              </span>
              <span className="text-white/90 font-medium">Reviews</span>
            </div>
          </div>
        </div>
      </div>
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {reviewData.map((review) => (
          <ReviewCard key={review.id} reviewDataProps={review} />
        ))}
      </div>
    </div>
  );
}

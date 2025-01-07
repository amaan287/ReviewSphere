import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "@/redux/store";
import { logoutFail, logoutSuccess } from "@/redux/user/userSlice";
import { useReviews } from "@/hooks/useReviews";
import { LoadingState } from "@/components/Profile/LoadingState.tsx";
import { ErrorState } from "@/components/Profile/ErrorState.tsx";
import { EmptyState } from "@/components/Profile/EmptyState.tsx";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";
import { SkeletonCard } from "@/components/SkeletonCard";

// Lazy load the ReviewCard component
const ReviewCard = lazy(() => import("@/components/ReviewCard/ReviewCard"));

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { reviewData, isLoading, error, getAllReviews } = useReviews(
    currentUser?.id
  );

  const logOut = async () => {
    try {
      await axios.post(`/api/v1/auth/logout`);
      dispatch(logoutSuccess());
      navigate("/");
    } catch (err) {
      alert("Failed to logout. Please try again later.");
      dispatch(logoutFail((err as Error).message));
    }
  };

  if (isLoading) {
    return (
      <LoadingState
        userName={currentUser?.name}
        createdAt={currentUser?.createdAt}
        numberOfReviews={reviewData.length}
        onLogout={logOut}
      />
    );
  }

  if (error) {
    return <ErrorState error={error} retry={getAllReviews} />;
  }

  if (reviewData.length === 0) {
    return (
      <EmptyState
        userName={currentUser?.name || ""}
        createdAt={currentUser?.createdAt || ""}
        onLogout={logOut}
      />
    );
  }

  return (
    <div className="mt-12 flex flex-col gap-4">
      <ProfileHeader
        userName={currentUser?.name || ""}
        createdAt={currentUser?.createdAt || ""}
        numberOfReviews={reviewData.length}
        onLogout={logOut}
      />
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <Suspense fallback={<SkeletonCard />}>
          {reviewData.map((review) => (
            <ReviewCard key={review.id} reviewDataProps={review} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}

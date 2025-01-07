// components/Profile/LoadingState.tsx
import { SkeletonCard } from "../SkeletonCard";
import { ProfileHeader } from "./ProfileHeader";

interface LoadingStateProps {
  userName?: string;
  createdAt?: string;
  numberOfReviews: number;
  onLogout: () => void;
}

export const LoadingState = ({
  userName,
  createdAt,
  numberOfReviews,
  onLogout,
}: LoadingStateProps) => (
  <div className="mt-12 flex flex-col gap-4">
    <ProfileHeader
      userName={userName || "Loading..."}
      createdAt={createdAt || new Date().toISOString()}
      numberOfReviews={numberOfReviews}
      onLogout={onLogout}
    />
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <SkeletonCard key={`skeleton-${index}`} />
      ))}
    </div>
  </div>
);

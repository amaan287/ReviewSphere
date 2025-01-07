import { ProfileHeader } from "./ProfileHeader.tsx";

interface EmptyStateProps {
  userName: string;
  createdAt: string;
  onLogout: () => void;
}

export const EmptyState = ({
  userName,
  createdAt,
  onLogout,
}: EmptyStateProps) => (
  <div className="mt-12 flex flex-col gap-4">
    <ProfileHeader
      userName={userName}
      createdAt={createdAt}
      numberOfReviews={0}
      onLogout={onLogout}
    />
    <div className="flex flex-col items-center justify-center p-8">
      <p className="text-center text-gray-500">No reviews found.</p>
    </div>
  </div>
);

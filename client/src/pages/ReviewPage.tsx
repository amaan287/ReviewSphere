import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Star,
  Clock,
  DollarSign,
  MapPin,
  Briefcase,
  MoreHorizontalIcon,
  Share2,
  UploadCloud,
  Trash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ReviewDataTypes } from "@/types/review";
import { formatDate } from "@/utils/dateFormatter";

export default function ReviewPage() {
  const [reviewData, setReviewData] = useState<ReviewDataTypes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const fullUrl = window.location.origin + location.pathname;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      alert("URL copied to clipboard!"); // Optional: give user feedback
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  const onDelete = () => {
    try {
      const res = axios.delete(`/api/v1/review/deleteReview/${id}`);
      if (!res) {
        setError("Fail to delete Review");
      }
      navigate("/");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to Delete review");
      console.log(e);
    }
  };
  useEffect(() => {
    async function fetchReviewData() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`/api/v1/review/getReviewById/${id}`);
        setReviewData(response.data.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch review data"
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchReviewData();
    }
  }, [id]);

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`w-6 h-6 md:w-8 md:h-8 ${
            index < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
        />
      ));
  };

  const getReviewTypeColor = (type: string) => {
    const types = {
      NOT_GOOD_NOT_BAD: "bg-yellow-100 text-yellow-800",
      GOOD: "bg-green-100 text-green-800",
      BAD: "bg-red-100 text-red-800",
      EXCELLENT: "bg-blue-100 text-blue-800",
    };
    return types[type as keyof typeof types] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading review...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <Card className="max-w-lg w-full">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 text-lg mb-2">
              Error loading review
            </div>
            <div className="text-gray-600">{error}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!reviewData) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <Card className="max-w-lg w-full">
          <CardContent className="p-6 text-center">
            <div className="text-gray-600">Review not found</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 mt-10 ">
      <Card className="mx-auto max-w-7xl h-full">
        <CardHeader className="space-y-6 p-6 md:p-8 relative">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl md:text-4xl font-bold">
                  {reviewData.companyName}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontalIcon className="flex md:hidden cursor-pointer text-gray-500 hover:text-gray-700" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={copyToClipboard}>
                      <Share2 /> Share
                    </DropdownMenuItem>
                    {currentUser?.id == reviewData.userId && currentUser ? (
                      <div>
                        <DropdownMenuItem className="">
                          <UploadCloud /> Update
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500 hover:text-gray-100 hover:bg-red-500 "
                          onClick={onDelete}
                        >
                          <Trash /> Delete
                        </DropdownMenuItem>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
                <span className="text-lg md:text-xl font-medium text-gray-700">
                  {reviewData.role}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center gap-4 ">
              <div className="flex gap-2">{renderStars(reviewData.rating)}</div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontalIcon className="md:flex hidden cursor-pointer text-gray-500 hover:text-gray-700" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={copyToClipboard}>
                    <Share2 /> Share
                  </DropdownMenuItem>
                  {currentUser?.id == reviewData.userId && currentUser ? (
                    <div>
                      <DropdownMenuItem className="">
                        <UploadCloud /> Update
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={onDelete}
                        className="text-red-500 hover:text-gray-100 hover:bg-red-500 "
                      >
                        <Trash /> Delete
                      </DropdownMenuItem>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-base md:text-lg">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5 md:w-6 md:h-6" />
              <span>{reviewData.location}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 md:w-6 md:h-6" />
              <span>{reviewData.hoursPerWeek}h/week</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="w-5 h-5 md:w-6 md:h-6" />
              <span>
                {reviewData.currency} {reviewData.salaryPerWeek}/week
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-6 md:p-8">
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              Responsibilities
            </h3>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              {reviewData.responsibilities}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              Feedback
            </h3>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              {reviewData.feedback}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-gray-200">
            <Badge
              variant="secondary"
              className={`${getReviewTypeColor(
                reviewData.reviewType
              )} text-base md:text-lg px-4 py-2`}
            >
              {reviewData.reviewType.replace(/_/g, " ")}
            </Badge>
            <span className="text-gray-500 text-base md:text-lg">
              {formatDate(reviewData.createdAt)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

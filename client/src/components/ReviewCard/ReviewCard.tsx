import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Clock, DollarSign, MapPin, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ReviewData {
  reviewDataProps: {
    id: string;
    companyName: string;
    role: string;
    responsibilities: string;
    location: string;
    feedback: string;
    reviewType: string;
    rating: number;
    hoursPerWeek: number;
    salaryPerWeek: string;
    currency: string;
    createdAt: string;
    userId: string;
  };
}

export default function ReviewCard({ reviewDataProps }: ReviewData) {
  const review = reviewDataProps;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
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

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <Link to={`/review/${review.id}`}>
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold line-clamp-1">
                {review.companyName}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-500" />
                <span className="text-md font-medium text-gray-700 line-clamp-1">
                  {review.role}
                </span>
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              {renderStars(review.rating)}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-1.5 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{review.location}</span>
            </div>

            <div className="flex items-center gap-1.5 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{review.hoursPerWeek}h/week</span>
            </div>

            <div className="flex items-center gap-1.5 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span>
                {review.currency} {review.salaryPerWeek}/week
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Responsibilities</h3>
            <p className="text-gray-700 line-clamp-3">
              {review.responsibilities}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Feedback</h3>
            <p className="text-gray-700 line-clamp-3">{review.feedback}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 text-sm">
            <Badge
              variant="secondary"
              className={`${getReviewTypeColor(review.reviewType)}`}
            >
              {review.reviewType.replace(/_/g, " ")}
            </Badge>
            <span className="text-gray-500 text-sm">
              {formatDate(review.createdAt)}
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

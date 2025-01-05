import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Clock, DollarSign, MapPin } from "lucide-react";

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
  const review = {
    id: reviewDataProps.id,
    companyName: reviewDataProps.companyName,
    role: reviewDataProps.role,
    responsibilities: reviewDataProps.responsibilities,
    location: reviewDataProps.location,
    feedback: reviewDataProps.feedback,
    reviewType: reviewDataProps.reviewType,
    rating: reviewDataProps.rating,
    hoursPerWeek: reviewDataProps.hoursPerWeek,
    salaryPerWeek: reviewDataProps.salaryPerWeek,
    currency: reviewDataProps.currency,
    createdAt: reviewDataProps.createdAt,
    userId: reviewDataProps.userId,
  };

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
  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            {review.companyName}
          </CardTitle>
          <div className="flex gap-1">{renderStars(review.rating)}</div>
        </div>
        <div className="text-lg font-medium text-gray-700">{review.role}</div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{review.location}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{review.hoursPerWeek} hours/week</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span>{review.salaryPerWeek}</span>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Responsibilities:</h3>
          <p className="text-gray-700">{review.responsibilities}</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Feedback:</h3>
          <p className="text-gray-700">{review.feedback}</p>
        </div>

        <div className="flex justify-between items-center pt-4 text-sm text-gray-500">
          <span>Review Type: {review.reviewType.replace(/_/g, " ")}</span>
          <span>Posted on: {formatDate(review.createdAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

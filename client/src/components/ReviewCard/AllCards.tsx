import axios from "axios";
import ReviewCard from "./ReviewCard";
import { useEffect, useState } from "react";

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

export default function AllCards() {
  const [reviewData, setReviewData] = useState<ReviewDataTypes[]>([]);

  async function getAllReviews() {
    const res = await axios.get("/api/v1/review/getReviews");
    const { data } = res;
    setReviewData(data.data);
  }
  useEffect(() => {
    getAllReviews();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {reviewData.map((review, index) => (
        <ReviewCard key={index} reviewDataProps={review} />
      ))}
    </div>
  );
}

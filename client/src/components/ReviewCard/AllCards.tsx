import axios from "axios";
import ReviewCard from "./ReviewCard";
import { useEffect, useState } from "react";
export default function AllCards() {
  const [reviewData, setReviewData] = useState({});

  async function getAllReviews() {
    const res = await axios.get("/api/v1/review/getReviews");
    const { data } = res;
    setReviewData(data);
    console.log(reviewData);
  }
  useEffect(() => {
    getAllReviews();
  }, []);
  return (
    <div>
      <ReviewCard data={reviewData} />
    </div>
  );
}

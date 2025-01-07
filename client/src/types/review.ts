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

import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Label } from "./ui/label";
import { Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

export interface FormData {
  reviewType: string;
  role: string;
  companyName: string;
  location: string;
  responsibilities: string;
  feedback: string;
  rating: number;
  hoursPerWeek: number;
  salaryPerWeek: string;
  currency: string;
  user_id: string | null;
}

export default function PostReviewForm() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<FormData>({
    reviewType: "",
    user_id: currentUser?.id || null,
    rating: 0,
    role: "",
    companyName: "",
    location: "",
    responsibilities: "",
    feedback: "",
    hoursPerWeek: 0,
    salaryPerWeek: "",
    currency: "USD",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const numericFormData = {
      ...formData,
      rating: Number(formData.rating),
      hoursPerWeek: Number(formData.hoursPerWeek),
    };

    if (
      !numericFormData.reviewType ||
      !numericFormData.role ||
      !numericFormData.companyName ||
      !numericFormData.location ||
      !numericFormData.responsibilities ||
      !numericFormData.feedback ||
      !numericFormData.hoursPerWeek ||
      !numericFormData.currency ||
      !numericFormData.salaryPerWeek ||
      !numericFormData.rating
    ) {
      return alert("Please fill all the fields");
    }

    try {
      const res = await axios.post("/api/v1/review/create", numericFormData);
      console.log(res);
      // Add success handling here (e.g., show success message, redirect, clear form)
    } catch (err) {
      console.error(err);
      alert("Error creating review. Please try again.");
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value =
      e.target.type === "number"
        ? parseFloat(e.target.value) || 0
        : e.target.value.trim();

    setFormData({ ...formData, [e.target.id]: value });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Post a Review</CardTitle>
        <CardDescription>
          Share your work experience to help others make informed decisions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <Label
                htmlFor="rating"
                className="mb-2 flex items-center gap-2 text-sm font-medium"
              >
                Rating <Star className="w-4 h-4" />
              </Label>
              <Input
                onChange={handleChange}
                placeholder="Rating from 1 to 5"
                type="number"
                min={1}
                max={5}
                name="rating"
                id="rating"
                value={formData.rating || ""}
                required
                className="w-full bg-white"
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">
                Review Type
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, reviewType: value })
                }
                value={formData.reviewType}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GOOD">Good</SelectItem>
                  <SelectItem value="BAD">Bad</SelectItem>
                  <SelectItem value="NOT_GOOD_NOT_BAD">
                    Not Good Not Bad
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                onChange={handleChange}
                placeholder="Your job title"
                type="text"
                name="role"
                id="role"
                value={formData.role}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                onChange={handleChange}
                placeholder="Company name"
                type="text"
                name="companyName"
                id="companyName"
                value={formData.companyName}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              placeholder="City, Country"
              onChange={handleChange}
              type="text"
              name="location"
              id="location"
              value={formData.location}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities">Key Responsibilities</Label>
            <Input
              onChange={handleChange}
              placeholder="Brief description of your main duties"
              type="text"
              name="responsibilities"
              id="responsibilities"
              value={formData.responsibilities}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Detailed Feedback</Label>
            <Input
              onChange={handleChange}
              placeholder="Share your experience working here"
              type="text"
              name="feedback"
              id="feedback"
              value={formData.feedback}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hoursPerWeek">Hours Per Week</Label>
              <Input
                onChange={handleChange}
                placeholder="Hours worked per week"
                type="number"
                min={1}
                max={168}
                name="hoursPerWeek"
                id="hoursPerWeek"
                value={formData.hoursPerWeek || ""}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Salary</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Amount per week"
                  onChange={handleChange}
                  type="number"
                  min={1}
                  max={999999}
                  name="salaryPerWeek"
                  id="salaryPerWeek"
                  value={formData.salaryPerWeek}
                  required
                />
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, currency: value })
                  }
                  value={formData.currency}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Submit Review
        </Button>
      </CardFooter>
    </Card>
  );
}

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
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 flex-col">
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
        />
        <Input
          onChange={handleChange}
          placeholder="Review Type"
          type="text"
          name="reviewType"
          id="reviewType"
          value={formData.reviewType}
          required
        />
        <div className="flex gap-2">
          <Input
            onChange={handleChange}
            placeholder="Role"
            type="text"
            name="role"
            id="role"
            value={formData.role}
            required
          />
          <Input
            onChange={handleChange}
            placeholder="Company Name"
            type="text"
            name="companyName"
            id="companyName"
            value={formData.companyName}
            required
          />
        </div>
        <Input
          placeholder="Employment Location"
          onChange={handleChange}
          type="text"
          name="location"
          id="location"
          value={formData.location}
          required
        />
        <Input
          onChange={handleChange}
          placeholder="Responsibilities"
          type="text"
          name="responsibilities"
          id="responsibilities"
          value={formData.responsibilities}
          required
        />
        <Input
          onChange={handleChange}
          placeholder="Feedback"
          type="text"
          name="feedback"
          id="feedback"
          value={formData.feedback}
          required
        />
        <div className="flex gap-2">
          <Input
            className="flex-1"
            onChange={handleChange}
            placeholder="Hours Per Week"
            type="number"
            min={1}
            max={168}
            name="hoursPerWeek"
            id="hoursPerWeek"
            value={formData.hoursPerWeek || ""}
            required
          />
          <div className="flex flex-1">
            <Input
              placeholder="Salary Per Week"
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

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

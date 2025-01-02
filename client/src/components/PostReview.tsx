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
    user_id: currentUser && currentUser.id,
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
    if (
      !formData.reviewType ||
      !formData.role ||
      !formData.companyName ||
      !formData.location ||
      !formData.responsibilities ||
      !formData.feedback ||
      !formData.hoursPerWeek ||
      !formData.currency ||
      !formData.salaryPerWeek
    ) {
      return alert("Please fill all the fields");
    }
    try {
      const res = await axios.post("/api/v1/review/create", {
        formData,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  return (
    <div>
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex gap-2 flex-col"
      >
        <Input
          className=""
          onChange={handleChange}
          placeholder="Rating from 1 to 5"
          type="number"
          name="rating"
          id="rating"
        />
        <Input
          className=""
          onChange={handleChange}
          placeholder="Review Type"
          type="text"
          name="reviewType"
          id="reviewType"
        />
        <div className="flex gap-2">
          <Input
            onChange={handleChange}
            className=""
            placeholder="Role"
            type="text"
            name="role"
            id="role"
          />
          <Input
            className=""
            onChange={handleChange}
            placeholder="Company Name"
            type="text"
            name="companyName"
            id="companyName"
          />
        </div>
        <Input
          className=""
          placeholder="Employment Location"
          onChange={handleChange}
          type="text"
          name="location"
          id="location"
        />
        <Input
          className=""
          onChange={handleChange}
          placeholder="Responsibilities"
          type="text"
          name="responsibilities"
          id="responsibilities"
        />
        <Input
          className=""
          onChange={handleChange}
          placeholder="Feedback"
          type="text"
          name="feedback"
          id="feedback"
        />
        <div className="flex gap-2">
          <Input
            className="flex-1"
            onChange={handleChange}
            placeholder="Hours Per Week"
            type="text"
            name="hoursPerWeek"
            id="hoursPerWeek"
          />
          <div className="flex flex-1">
            <Input
              className=""
              placeholder="Salary Per Week"
              onChange={handleChange}
              type="number"
              min={1}
              max={999999}
              name="salaryPerWeek"
              id="salaryPerWeek"
            />
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, currency: value })
              }
              value={formData.currency} // Add this line
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

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PostReviewForm() {
  return (
    <div>
      <form action="submit">
        <Input
          className=""
          placeholder="Review Type"
          type="text"
          name="reviewType"
          id="reviewType"
        />
        <div className="flex gap-2">
          <Input
            className=""
            placeholder="Role"
            type="text"
            name="role"
            id="role"
          />
          <Input
            className=""
            placeholder="Company Name"
            type="text"
            name="companyName"
            id="companyName"
          />
        </div>
        <Input
          className=""
          placeholder="Responsibilities"
          type="text"
          name="responsibilities"
          id="responsibilities"
        />
        <Input
          className=""
          placeholder="Feedback"
          type="text"
          name="feedback"
          id="feedback"
        />
        <div className="flex gap-2">
          <Input
            className="flex-1"
            placeholder="Hours Per Week"
            type="text"
            name="hoursPerWeek"
            id="hoursPerWeek"
          />
          <div className="flex flex-1">
            <Input
              className=""
              placeholder="Salary Per Week"
              type="number"
              min={1}
              max={999999}
              name="salaryPerWeek"
              id="salaryPerWeek"
            />
            <Select>
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

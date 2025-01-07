import ScrollHidingDialog from "@/components/HidingDialog";
import AllCards from "@/components/ReviewCard/AllCards";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <div className="w-full min-h-screen pt-16">
      <div className="max-w-[1600px] mx-auto">
        <AllCards />
      </div>
      {currentUser && <ScrollHidingDialog />}
    </div>
  );
}

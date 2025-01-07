// components/Profile/ProfileHeader.tsx
import { Settings } from "lucide-react";
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { formatDate } from "../../utils/dateFormatter";

interface ProfileHeaderProps {
  userName: string;
  createdAt: string;
  numberOfReviews: number;
  onLogout: () => void;
}

export const ProfileHeader = ({
  userName,
  createdAt,
  numberOfReviews,
  onLogout,
}: ProfileHeaderProps) => (
  <div className="relative overflow-hidden px-8 py-8 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 shadow-xl rounded-xl">
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
    </div>

    <div className="relative flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
          <Drawer.Root>
            <DrawerTrigger>
              <Settings className="w-6 h-6 text-white/80" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>You want to logout </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button onClick={onLogout} variant="destructive">
                  Logout
                </Button>
                <DrawerClose>
                  <Button variant="link">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer.Root>
        </div>

        <h1 className="text-4xl font-bold text-white tracking-tight">
          {userName}
          <span className="block text-sm font-normal text-white/80 mt-1">
            Member since {formatDate(createdAt) || "Today"}
          </span>
        </h1>
      </div>

      <div className="group">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center justify-center min-w-[3rem] bg-white/10 backdrop-blur-sm text-white font-bold px-4 py-2 rounded-full transition-all duration-300 group-hover:bg-white group-hover:text-blue-600">
            {numberOfReviews}
          </span>
          <span className="text-white/90 font-medium">Reviews</span>
        </div>
      </div>
    </div>
  </div>
);

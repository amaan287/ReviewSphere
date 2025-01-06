import { useState, useEffect, ReactNode } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ScrollHidingDialog = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show when scrolling up, hide when scrolling down
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed right-10 z-50 bottom-10 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-[200%]"
      }`}
    >
      <Dialog>
        <DialogTrigger className="bg-white p-2 shadow-lg hover:shadow-xl rounded-full border-2">
          <Plus size={30} />
        </DialogTrigger>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default ScrollHidingDialog;

import { RootState } from "@/redux/store";
import { User } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

import { useEffect, useState } from "react";

export default function FooterDock() {
  const { currentUser } = useSelector((state: RootState) => state.user);

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
      className={`fixed shadow-lg rounded-b-lg top-0 right-0 left-0 bg-white border-t border-gray-200 px-2 py-3 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-[-200%]"
      }`}
    >
      <nav className="w-screen">
        <div className="flex items-center justify-between px-6">
          <Link to="/" className="flex flex-col items-center">
            <h1 className="text-lg font-semibold">Heritage strokes</h1>
          </Link>
          {currentUser ? (
            <Link to={"/profile"} className="flex flex-col items-center">
              <User
              // onClick={logOut}
              />
            </Link>
          ) : (
            <Link to="/login" className="flex flex-col items-center">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

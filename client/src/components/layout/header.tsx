import { User } from "lucide-react";
import { Link } from "react-router-dom";

export default function FooterDock() {
  return (
    <div className="fixed shadow-lg rounded-b-lg top-0 right-0 left-0 bg-white border-t border-gray-200 px-2 py-3 z-50">
      <nav className="w-screen">
        <div className="flex items-center justify-between px-6">
          <Link to="/" className="flex flex-col items-center">
            <h1 className="text-lg font-semibold">Heritage strokes</h1>
          </Link>

          <Link to="/profile" className="flex flex-col items-center">
            <User />
          </Link>
        </div>
      </nav>
    </div>
  );
}

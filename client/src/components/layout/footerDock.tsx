import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function FooterDock() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3  z-50">
      <nav className="max-w-lg mx-auto">
        <div className="flex items-center justify-between px-4">
          <Link to="/" className="flex flex-col items-center">
            <Home className="h-6 w-6" strokeWidth={2} />
          </Link>

          <Link to="/search" className="flex flex-col items-center">
            <Search className="h-6 w-6" strokeWidth={2} />
          </Link>

          <Link to="/create" className="flex flex-col items-center">
            <PlusSquare className="h-6 w-6" strokeWidth={2} />
          </Link>

          <Link to="/notifications" className="flex flex-col items-center">
            <Heart className="h-6 w-6" strokeWidth={2} />
          </Link>

          <Link to="/profile" className="flex flex-col items-center">
            <User className="h-6 w-6" strokeWidth={2} />
          </Link>
        </div>
      </nav>
    </div>
  );
}

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <header className="top-0 z-50">
      <nav className="border max-w-screen  h-14 flex  justify-between px-4 py-2">
        <Link
          to="/"
          className="text-sm sm:text-xl font-semibold flex items-center justify-center gap-2"
        >
          <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
          Logo
        </Link>

        <div>
          {currentUser ? (
            <Link to="/profile" className="text-sm sm:text-lg font-semibold">
              {currentUser.name}
            </Link>
          ) : (
            <Link to="/signup" className="text-sm sm:text-lg font-semibold">
              Signup
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

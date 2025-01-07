import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  // If user is logged in and trying to access login/signup, redirect to home
  if (currentUser && ["/login", "/signup"].includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

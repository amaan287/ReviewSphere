import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "../components/routing/ProtectedRoute";
import { PublicRoute } from "../components/routing/PublicRoute";
import {
  HomePage,
  SignupPage,
  LoginPage,
  ReviewPage,
  ProfilePage,
  CreateReview,
} from "./LazyPages";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignupPage />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/review/:id",
    element: (
      <ProtectedRoute>
        <ReviewPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create",
    element: (
      <ProtectedRoute>
        <CreateReview />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <div>404 - Page Not Found</div>,
  },
];

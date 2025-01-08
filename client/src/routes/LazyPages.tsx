import { lazy } from "react";

export const HomePage = lazy(() => import("@/pages/HomePage"));
export const SignupPage = lazy(() => import("../pages/SignupPage.tsx"));
export const LoginPage = lazy(() => import("@/pages/LoginPage"));
export const ReviewPage = lazy(() => import("@/pages/ReviewPage"));
export const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
export const CreateReview = lazy(() => import("@/pages/CreateReview"));

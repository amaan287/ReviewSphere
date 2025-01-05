import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginFail, loginStart, loginSuccess } from "@/redux/user/userSlice";
import { RootState } from "@/redux/store";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface loginForm {
  name?: string;
  email?: string;
  password?: string;
  reenterPassword?: string;
}

interface LoginFormProps {
  className?: string;
}

export default function LoginForm({ className = "" }: LoginFormProps) {
  const [formData, setFormData] = useState<loginForm>({});
  const { loading, error: errorMessage } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(loginFail("Please fill in all fields"));
      return;
    }

    try {
      dispatch(loginStart());
      const res = await axios.post(
        "/api/v1/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success === false) {
        dispatch(loginFail(res.data.message || "Login failed"));
        return;
      }
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.access_token);
        dispatch(loginSuccess(res.data.data));
        navigate("/");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch(loginFail(e.response?.data.message || "Login failed"));
        return;
      }
      dispatch(loginFail("An unexpected error occurred"));
    }
  };

  return (
    <div className={`flex min-h-full items-center justify-center ${className}`}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={handleChange}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                onChange={handleChange}
                id="password"
                placeholder="Enter your password"
                className="w-full"
              />
            </div>

            {errorMessage && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <Button
              disabled={loading}
              type="submit"
              className="w-full"
              variant="default"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <span className="font-semibold text-gray-800">
                <Link to="/signup">Create an account</Link>
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

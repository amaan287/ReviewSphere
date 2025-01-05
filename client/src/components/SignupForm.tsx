import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signupFail, signupStart, signupSuccess } from "@/redux/user/userSlice";
import { RootState } from "@/redux/store";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SignupFormProps {
  name?: string;
  email?: string;
  password?: string;
  reenterPassword?: string;
}

export default function SignupForm() {
  const [formData, setFormData] = useState<SignupFormProps>({});
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.reenterPassword
    ) {
      dispatch(signupFail("Please fill in all fields"));
      return;
    }
    if (formData.password !== formData.reenterPassword) {
      dispatch(signupFail("Password and re-entered password do not match"));
      return;
    }
    try {
      dispatch(signupStart());
      const res = await axios.post("/api/v1/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      const data = res.data;

      if (data.success === false) {
        dispatch(signupFail(data.message));
        return;
      }

      if (res.status === 200) {
        dispatch(signupSuccess(data));
        navigate("/login");
      }
    } catch (e) {
      dispatch(signupFail((e as Error).message));
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                onChange={handleChange}
                type="text"
                id="name"
                placeholder="Enter your full name"
                className="w-full"
              />
            </div>

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
                placeholder="Create a password"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reenterPassword">Confirm Password</Label>
              <Input
                type="password"
                onChange={handleChange}
                id="reenterPassword"
                placeholder="Re-enter your password"
                className="w-full"
              />
            </div>

            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full mt-6"
              disabled={loading}
              variant="default"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span className="font-semibold text-gray-800">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

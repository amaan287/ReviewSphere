import { useState } from "react";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginFail, loginStart, loginSuccess } from "@/redux/user/userSlice";
import { RootState } from "@/redux/store";
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

      console.log(res.data);
      if (res.data.success === false) {
        dispatch(loginFail(res.data.message || "Login failed"));
        return;
      }
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.access_token);
        console.log(res.data.access_token);
        dispatch(loginSuccess(res.data.data));
        navigate("/");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch(loginFail(e.response?.data.message || "Login failed"));
        return;
      }
      console.error(e);
      dispatch(loginFail("An unexpected error occured"));
      return;
    }
  };
  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <Input onChange={handleChange} type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input type="password" onChange={handleChange} id="password" />
        </div>

        <button disabled={loading} type="submit">
          Login
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

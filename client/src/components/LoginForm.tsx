import { useState } from "react";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginFail, loginStart, loginSuccess } from "@/redux/user/userSlice";
import { RootState } from "@/redux/store";
interface SignupFormProps {
  name?: string;
  email?: string;
  password?: string;
  reenterPassword?: string;
}
export default function LoginForm() {
  const [formData, setFormData] = useState<SignupFormProps>({});
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
      const res = await axios.post("/api/v1/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      const data = res.data;
      console.log(data);
      if (data.success === false) {
        dispatch(loginFail(data.message || "Login failed"));
        return;
      }
      if (res.status === 200) {
        dispatch(loginSuccess(data.data));
        navigate("/");
      }
    } catch (e) {
      console.error(e);
      dispatch(loginFail((e as Error).message));
      return;
    }
  };
  return (
    <div>
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

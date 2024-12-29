import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signupFail, signupStart, signupSuccess } from "@/redux/user/userSlice";
import { RootState } from "@/redux/store";
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
      console.log(data);
      if (data.success === false) {
        dispatch(signupFail(data.message));
        return;
      }

      if (res.status === 200) {
        console.log(data);
        dispatch(signupSuccess(data));
        navigate("/login");
      }
    } catch (e) {
      dispatch(signupFail((e as Error).message));
      return;
    }
  };
  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <Input onChange={handleChange} type="text" id="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input onChange={handleChange} type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input type="password" onChange={handleChange} id="password" />
        </div>
        <div>
          <label htmlFor="reenterPassword">Password</label>
          <Input type="password" onChange={handleChange} id="reenterPassword" />
        </div>
        <button type="submit" disabled={loading}>
          Signup
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

import { useState } from "react";
import { Input } from "./ui/input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface SignupFormProps {
  name?: string;
  email?: string;
  password?: string;
  reenterPassword?: string;
}
export default function LoginForm() {
  const [formData, setFormData] = useState<SignupFormProps>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill in all fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await axios.post("/api/v1/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      const data = res.data;
      console.log(data);
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (e) {
      setLoading(false);
      setErrorMessage((e as Error).message);
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

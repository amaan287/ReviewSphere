import { Input } from "./ui/input";

export default function SignupForm() {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <Input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input type="password" id="password" />
        </div>
        <button>Signup</button>
      </form>
    </div>
  );
}

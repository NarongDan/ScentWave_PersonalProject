import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import useAuth from "../../../hooks/useAuth";
import Input from "../../../components/Input";
import validateLogin from "../../../validators/validate-log";

const initialInput = {
  email: "",
  password: "",
};

const initialInputError = {
  email: "",
  password: "",
};
export default function LoginForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();

      // validate ด้วย Joi ก่อน
      const error = validateLogin(input);

      if (error) {
        setInputError(error);
        return; // หยุดการทำงานของฟังก์ชัน
      }

      const res = await login(input);

      if (res.isAdmin) {
        navigate("/admin");
      } else navigate("/");

      toast.success("login successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response.status === 400
            ? "invalid email or password"
            : "internal server error";

        return toast.error(message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="grid gap-4 ">
        <p className="text-center font-semibold text-2xl text-black ">LOGIN</p>
        <div className="w-4"></div>
        <Input
          placeholder="Email address"
          value={input.email}
          name="email"
          onChange={handleChange}
          error={inputError.email}
        />
        <div className="w-4"></div>
        <Input
          placeholder="password"
          name="password"
          value={input.password}
          onChange={handleChange}
          error={inputError.password}
        />
        <div className="w-4"></div>
        <button className="w-full bg-yellow-300 text-black px-3 py-1.5 font-bold rounded-md hover:bg-yellow-500  transition-colors duration-300 ">
          Log in
        </button>

        <div className="flex flex-col w-full border-opacity-50">
          <div className="divider">OR</div>
        </div>
        <Link to="/register">
          <button className="w-full bg-yellow-300 text-black px-3 py-1.5 font-bold rounded-md hover:bg-yellow-500  transition-colors duration-300">
            Sign Up
          </button>
        </Link>
      </div>
    </form>
  );
}

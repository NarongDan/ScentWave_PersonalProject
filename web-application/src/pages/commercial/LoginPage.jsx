import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const initialInput = {
  email: "",
  password: "",
};

// const initialInputError = {
//   email: "",
//   password: "",
// };
export default function LoginPage() {
  const [input, setInput] = useState(initialInput);
  // const [inputError, setInputError] = useState(initialInputError);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();

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
      <div>
        <input
          type="text"
          placeholder="email"
          name="email"
          value={input.email}
          onChange={handleChange}
        />
      </div>

      <div className="">
        <input
          type="text"
          placeholder="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
      </div>
      <button> Log in</button>
    </form>
  );
}

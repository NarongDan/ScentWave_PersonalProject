import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import useAuth from "../../../hooks/useAuth";
import Input from "../../../components/Input";
import validateLogin from "../../../validators/validate-log";
import GoogleLogin from "react-google-login";
import { useEffect } from "react";
import { gapi } from "gapi-script";

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
  const CLIENT_ID =
    "489301703602-5qnb372i6bbm4bdbhjvs9p3km5j6tu37.apps.googleusercontent.com";

  const handleChange = (e) =>
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleGoogleLoginSuccess = async (response) => {
    const profile = response.profileObj;
    try {
      // ส่งข้อมูลโปรไฟล์ไปยังหน้า Register
      navigate("/register", { state: { profile } });
      location.reload(); // ใช้logout
    } catch (error) {
      console.error("Error navigating to register page:", error);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login failed:", error);
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();

      const error = validateLogin(input);

      if (error) {
        setInputError(error);
        return;
      }

      const res = await login(input);

      if (res.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
        window.location.reload();
      }

      toast.success("Login successful");
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response.status === 400
            ? "Invalid email or password"
            : "Internal server error";

        return toast.error(message);
      }
    }
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: "",
      });
    };

    gapi.load("client:auth2", initClient);
  }, []);

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="grid gap-4">
        <p className="text-center font-semibold text-2xl text-black">LOGIN</p>
        <Input
          placeholder="Email address"
          value={input.email}
          name="email"
          onChange={handleChange}
          error={inputError.email}
        />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          value={input.password}
          onChange={handleChange}
          error={inputError.password}
        />
        <button className="w-full bg-yellow-300 text-black px-3 py-1.5 font-bold rounded-md hover:bg-yellow-500 transition-colors duration-300">
          Log in
        </button>
        <div className="flex flex-col w-full border-opacity-50">
          <div className="divider">OR</div>
        </div>
        {/* Google Login Button */}
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Sign up with Google"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={false}
        />
        <Link to="/register">
          <button className="w-full bg-yellow-300 text-black px-3 py-1.5 font-bold rounded-md hover:bg-yellow-500 transition-colors duration-300">
            Sign Up
          </button>
        </Link>
      </div>
    </form>
  );
}

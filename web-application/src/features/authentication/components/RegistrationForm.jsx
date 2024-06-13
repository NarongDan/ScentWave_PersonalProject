import authApi from "../../../apis/auth";
import Input from "../../../components/Input";
import { useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import validateRegister from "../../../validators/validate-register";
import Textarea from "../../../components/Textarea";
import { useNavigate } from "react-router-dom";
import cartApi from "../../../apis/cart";
import useCommercial from "../../../hooks/useCommercial";

const initialInput = {
  firstName: "",
  lastName: "",
  address: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialInputError = {
  firstName: "",
  lastName: "",
  address: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegistrationForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const navigate = useNavigate();

  const handleChangeInput = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const handleSubmitForm = async (e) => {
    try {
      //Validate
      e.preventDefault();
      const error = validateRegister(input);
      if (error) {
        return setInputError(error);
      }
      /// set ให้เป็นค่าเริ่มต้นกลับไป เมื่อผู้ใช้กดปุ่ม sign up
      setInputError({ ...initialInput });
      // create user

      const res = await authApi.register(input);

      const guestCart = JSON.parse(localStorage.getItem("guestCart"));

      const data = {
        email: res.data.message.email,
        cart: guestCart,
      };
      toast.success("registered successfully, please log in to continue");

      navigate("/login");

      if (guestCart.length > 0) {
        await cartApi.addCartFromGuest(data);
        localStorage.removeItem("guestCart");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      //check ว่า axios errro จากตรงไหน ถ้า error status 400-500 จะมาจาก AxiosError  ต้องเช็คโดยถามว่า error ที่ได้มา เป็น instance of AxiosError ไหม

      if (error instanceof AxiosError) {
        if (error.response.data.field === "email") {
          setInputError((prev) => ({
            ...prev,
            email: "email already in use",
          }));
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <p className="mb-10 text-center font-semibold text-2xl text-black ">
        REGISTRATION
      </p>
      <div className="grid grid-cols-2 gap-4 text-center ">
        <div className="col-span-2 flex flex-col">
          <Input
            placeholder="First Name"
            name="firstName"
            value={input.firstName}
            onChange={handleChangeInput}
            error={inputError.firstName}
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <Input
            placeholder="Last Name"
            name="lastName"
            value={input.lastName}
            onChange={handleChangeInput}
            error={inputError.lastName}
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <Textarea
            placeholder="Address"
            name="address"
            value={input.address}
            onChange={handleChangeInput}
            error={inputError.address}
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <Input
            placeholder="Phone number"
            name="phone"
            value={input.phone}
            onChange={handleChangeInput}
            error={inputError.phone}
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <Input
            placeholder="Email address"
            name="email"
            value={input.email}
            onChange={handleChangeInput}
            error={inputError.email}
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={handleChangeInput}
            error={inputError.password}
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <Input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={handleChangeInput}
            error={inputError.confirmPassword}
          />
        </div>
        <div className="col-span-2 text-center">
          <button className="w-full bg-yellow-300 text-black px-3 py-1.5 mt-4 font-bold rounded-md hover:bg-yellow-500  transition-colors duration-300">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}

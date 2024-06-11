import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import validateUpdate from "../../../validators/validate-update";
import authApi from "../../../apis/auth";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

// const initialInput = {
//   firstName: "",
//   lastName: "",
//   address: "",
//   phone: "",
//   password: "",
//   confirmPassword: "",
// };

const initialInputError = {
  firstName: "",
  lastName: "",
  address: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function PersonalInformation() {
  const { authUser } = useAuth();

  const [input, setInput] = useState({});
  const [inputError, setInputError] = useState(initialInputError);
  const [isEditing, setIsEditing] = useState(false);
  console.log(input);

  const handleChangeInput = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const handleSubmitUpdate = async (e) => {
    try {
      e.preventDefault();
      const error = validateUpdate(input);
      if (error) {
        return setInputError(error);
      }
      setInputError({ ...initialInputError });

      await authApi.updateUserInfo(input);
      setInput({});
      toast.success("updated successfully");
      setIsEditing(false); // ปิดโหมดการแก้ไขเมื่อกด Save
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response.data.field === "password") {
          setInputError((prev) => ({
            ...prev,
            password: "invalid password",
          }));
        }
      }
    }
  };

  return (
    <div className="w-3/4 p-4">
      <h2 className="text-3xl text-black font-bold mb-6">My Details</h2>
      <form className="space-y-4" onSubmit={handleSubmitUpdate}>
        <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
          <div className="md:w-1/2 w-full">
            <label className="block text-gray-700">First Name</label>
            {isEditing ? (
              <Input
                type="text"
                name="firstName"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                value={input.firstName}
                onChange={handleChangeInput}
                placeholder={authUser?.firstName}
                error={inputError.firstName}
              />
            ) : (
              <p>{authUser?.firstName}</p>
            )}
          </div>
          <div className="md:w-1/2 w-full">
            <label className="block text-gray-700">Last Name</label>
            {isEditing ? (
              <Input
                type="text"
                name="lastName"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                value={input.lastName}
                onChange={handleChangeInput}
                placeholder={authUser.lastName}
                error={inputError.lastName}
              />
            ) : (
              <p>{authUser?.lastName}</p>
            )}
          </div>
        </div>
        <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
          <div className="md:w-1/2 w-full">
            <label className="block text-gray-700">Email</label>
            {isEditing ? (
              <Input
                type="email"
                name="email"
                className="w-full mt-1 px-4 py-2 border rounded-lg readonly"
                value={authUser?.email}
              />
            ) : (
              <p>{authUser?.email}</p>
            )}
          </div>
          <div className="md:w-1/2 w-full">
            <label className="block text-gray-700">Phone</label>
            {isEditing ? (
              <Input
                type="text"
                name="phone"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                value={input.phone}
                onChange={handleChangeInput}
                placeholder={authUser?.phone}
                error={inputError.phone}
              />
            ) : (
              <p>{authUser?.phone}</p>
            )}
          </div>
        </div>
        <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
          <div className="md:w-1/2 w-full">
            <label className="block text-gray-700">Address</label>
            {isEditing ? (
              <Textarea
                name="address"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                rows="3"
                value={input.address}
                onChange={handleChangeInput}
                placeholder={authUser?.address}
                error={inputError.address}
              />
            ) : (
              <p>{authUser?.address}</p>
            )}
          </div>
        </div>

        <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
          {isEditing && (
            <>
              <div className="md:w-1/2 w-full">
                <label className="block text-gray-700">Password</label>
                <Input
                  type="password"
                  name="password"
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                  value={input?.password}
                  onChange={handleChangeInput}
                  error={inputError.password}
                />
              </div>
            </>
          )}
          {isEditing && (
            <>
              <div className="md:w-1/2 w-full">
                <label className="block text-gray-700">Confirm Password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                  value={input?.confirmPassword}
                  onChange={handleChangeInput}
                  error={inputError.confirmPassword}
                />
              </div>
            </>
          )}
        </div>

        {!isEditing && (
          <button
            type="button"
            className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition ease-in-out duration-300"
            onClick={() => setIsEditing(true)}
          >
            Edit Information
          </button>
        )}
        {isEditing && (
          <div className="space-x-5">
            <button
              type="button"
              className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition ease-in-out duration-300"
              onClick={handleSubmitUpdate}
            >
              Save
            </button>
            <button
              type="button"
              className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition ease-in-out duration-300"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

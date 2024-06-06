import { FaUserTie, FaSignInAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar() {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const button = await Swal.fire({
        text: "Are you sure?",
        title: "Logout",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        logout();
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        title: "error",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className=" relative h-[64px] w-full p-3 flex justify-end items-center bg-white shadow-md">
      <div className="w-10 h-10 flex items-center justify-center bg-gray-200 m-2 p-2 rounded-full hover:bg-gray-300 cursor-pointer transition duration-200">
        <FaUserTie className="text-gray-700" size={20} />
      </div>
      <div
        className="w-10 h-10 flex items-center justify-center bg-gray-200 m-2 p-2 rounded-full hover:bg-gray-300 cursor-pointer transition duration-200"
        onClick={handleLogout}
      >
        <FaSignInAlt className="text-gray-700" size={20} />
      </div>
    </div>
  );
}

import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ProfilePage() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div className="w-full h-full mt-20 mb-10 px-10 bg-white">
      <div className="flex bg-white pt-10 pb-20 rounded-lg mx-auto shadow-xl outline outline-2 outline-gray-100">
        <div className="w-1/4 h-[500x] p-4 border-r border-gray-200  ">
          <div className="flex flex-col space-y-5 ">
            <Link to="">
              <div className="font-semibold text-blue-600 cursor-pointer hover:text-blue-800">
                Personal Information
              </div>
            </Link>
            <Link to="history">
              <div className="cursor-pointer hover:text-blue-800">
                Order History
              </div>
            </Link>
            <Link to="/">
              <div
                className="cursor-pointer hover:text-blue-800"
                onClick={logout}
              >
                Logout
              </div>
            </Link>
          </div>
        </div>

        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

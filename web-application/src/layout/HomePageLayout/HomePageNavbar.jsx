import { FaUserTie } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function HomePageNavbar() {
  return (
    <div className="">
      <header className="flex w-full justify-evenly items-center bg-white py-4 shadow-lg">
        <div className="text-xl font-bold">ScentWave</div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-500 hover:text-gray-700">
            TEATURED
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            FRAGRANCES
          </a>

          <a href="#" className="text-gray-500 hover:text-gray-700">
            ABOUT SCENTWAVE
          </a>
        </div>
        <div className="flex space-x-4">
          <Link to="login">
            <div className="w-10 h-10 flex items-center justify-center  m-2 p-2 rounded-full hover:bg-gray-300 cursor-pointer transition duration-200">
              <FaUserTie className="text-gray-700" size={20} />
            </div>
          </Link>
          <div className="w-10 h-10 flex items-center justify-center  m-2 p-2 rounded-full hover:bg-gray-300 cursor-pointer transition duration-200">
            <IoCartOutline className="text-gray-700" size={20} />
          </div>
        </div>
      </header>
    </div>
  );
}

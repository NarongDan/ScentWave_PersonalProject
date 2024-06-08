import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaProductHunt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="min-w-[200px] h-screen bg-[#1e293b] px-8">
      <div className="flex flex-col space-y-10 mt-5">
        <p className="text-4xl mb-10 font-bold text-white">ScentWave</p>
        <Link to="">
          <button className="flex items-center space-x-3 px-4 py-2 bg-[#3b4a5a] text-white rounded-md hover:bg-[#2e3b4a] transition duration-200">
            <FaProductHunt size={20} />
            <span>Product Management</span>
          </button>
        </Link>
        <Link to="order-management">
          <button className="flex items-center space-x-3 px-4 py-2 bg-[#3b4a5a] text-white rounded-md hover:bg-[#2e3b4a] transition duration-200">
            <HiOutlineClipboardDocumentList size={20} />
            <span>Order Management</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

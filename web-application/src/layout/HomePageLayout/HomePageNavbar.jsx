import { useState, useEffect } from "react";
import { FaUserTie } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";

export default function HomePageNavbar() {
  const [cartItemCount, setCartItemCount] = useState(0);

  const { cart } = useCart();
  const { authUser } = useAuth();

  // ตรวจสอบหากผู้ใช้ไม่ได้ล็อกอิน ให้ใช้ตะกร้าจาก local storage
  const guestCart = !authUser
    ? JSON.parse(localStorage.getItem("guestCart")) || []
    : [];

  // ใช้ตะกร้าที่ถูกต้องขึ้นอยู่กับสถานะการล็อกอินของผู้ใช้
  const currentCart = authUser ? cart : guestCart;

  useEffect(() => {
    // เมื่อค่าของ currentCart เปลี่ยนแปลง ให้อัปเดตจำนวนรายการในตะกร้า
    setCartItemCount(currentCart.length);
  }, [currentCart]); // ระบุ currentCart เป็น dependency เพื่อให้ useEffect เรียกใช้งานเมื่อค่าเปลี่ยน

  return (
    <div className="">
      <header className="sticky top-0 flex w-full justify-evenly items-center bg-white py-4 shadow-lg z-50">
        <Link to="/">
          <div className="text-xl font-bold">ScentWave</div>
        </Link>
        <div className="flex space-x-4">
          <Link to="/products" className="text-gray-500 hover:text-gray-700">
            PRODUCTS
          </Link>
          <Link to="#" className="text-gray-500 hover:text-gray-700">
            ABOUT SCENTWAVE
          </Link>
          <Link to="#" className="text-gray-500 hover:text-gray-700">
            CONTACT US
          </Link>
        </div>

        <div className="flex space-x-4 relative">
          <Link to="cart">
            <div className="relative">
              <div className="w-10 h-10 flex items-center justify-center m-2 p-2 rounded-full hover:bg-gray-300 cursor-pointer transition duration-200">
                <IoCartOutline className="text-gray-700" size={30} />
              </div>
              {cartItemCount > 0 && (
                <div className="absolute top-2 right-3 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </div>
              )}
            </div>
          </Link>

          <Link to="login">
            <div className="w-10 h-10 flex items-center justify-center m-2 p-2 rounded-full hover:bg-gray-300 cursor-pointer transition duration-200">
              <FaUserTie className="text-gray-700" size={25} />
            </div>
          </Link>
        </div>
      </header>
    </div>
  );
}

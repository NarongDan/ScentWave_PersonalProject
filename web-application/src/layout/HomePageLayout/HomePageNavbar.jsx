import { useState, useEffect } from "react";
import { FaUserTie } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

export default function HomePageNavbar() {
  const { cartItemCount } = useCart();

  return (
    <div className="bg-white shadow-lg sticky top-0 z-40 px-10 ">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          ScentWave
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/products" className="text-gray-500 hover:text-gray-700">
            PRODUCTS
          </Link>
          <Link to="/about" className="text-gray-500 hover:text-gray-700">
            ABOUT SCENTWAVE
          </Link>
          <Link to="contact" className="text-gray-500 hover:text-gray-700">
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
        {/* <div className="md:hidden">
          <button className="mobile-menu-button focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div> */}
      </div>
      <div className="mobile-menu hidden">
        <Link to="/products" className="block py-2 px-4 text-gray-700">
          PRODUCTS
        </Link>
        <Link to="#" className="block py-2 px-4 text-gray-700">
          ABOUT SCENTWAVE
        </Link>
        <Link to="#" className="block py-2 px-4 text-gray-700">
          CONTACT US
        </Link>
      </div>
    </div>
  );
}

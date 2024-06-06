import React from "react";

export default function Navbar() {
  return (
    <div className="h-[64px] w-full p-3 flex justify-end items-center bg-white ">
      <div className="w-10 flex items-center justify-center bg-gray-200 m-2 p-3 rounded-full hover:bg-gray-300 cursor-pointer">
        <i class="fa-solid fa-user-tie"></i>
      </div>
      <div className="w-10 flex items-center justify-center bg-gray-200 m-2 p-3 rounded-full hover:bg-gray-300 cursor-pointer">
        <i class="fa-solid fa-right-to-bracket"></i>
      </div>
    </div>
  );
}

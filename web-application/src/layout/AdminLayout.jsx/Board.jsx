import { Outlet } from "react-router-dom";

export default function Board() {
  return (
    <>
      <div className="h-full w-full p-10 bg-gray-100">
        <div className="h-full w-full bg-white rounded-lg p-10 space-y-5">
          <Outlet />
        </div>
      </div>
    </>
  );
}

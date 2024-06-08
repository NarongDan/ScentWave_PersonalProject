import { Outlet } from "react-router-dom";
import HomePageNavbar from "./HomePageNavbar";

export default function HomePageMainContainer() {
  return (
    <div className="w-screen h-screen flex flex-col bg-gray-100">
      <HomePageNavbar />
      <div className="bg-gray-100 flex items-center justify-center w-full h-full p-10  ">
        <Outlet />
      </div>

      <footer className="min-h-20 ">This is footer</footer>
    </div>
  );
}

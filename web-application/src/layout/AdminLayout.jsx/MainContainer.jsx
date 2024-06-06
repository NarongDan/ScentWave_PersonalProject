import Board from "./Board";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainContainer() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-[calc(100%-300px)]">
        <Navbar />
        <Board />
      </div>
    </div>
  );
}

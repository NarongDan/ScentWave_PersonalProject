import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
export default function Sidebar() {
  return (
    <div className="min-w-[200px] h-screen bg-[#1e293b] px-7 py-8">
      <div className="my-10 flex flex-col space-y-10">
        <p className="text-2xl text-[#ffffff]">ScentWave</p>
        <button className="btn btn-active w-full flex space-x-3 hover:bg-slate-00">
          <i className="fa-brands fa-product-hunt"></i>
          <p>Product Management</p>
        </button>
        <button className="btn btn-active w-full flex space-x-3 hover:bg-slate-700">
          <HiOutlineClipboardDocumentList />
          <p>Order Management</p>
        </button>
      </div>
    </div>
  );
}

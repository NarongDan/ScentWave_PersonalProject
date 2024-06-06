import AddProduct from "../../features/admin/components/AddProduct";

export default function Board() {
  return (
    <>
      <div className="h-full w-full p-10 bg-gray-100">
        <div className="h-full w-full bg-white rounded-lg p-10 space-y-5">
          <p className="text-2xl text-black font-semibold">
            Product Management
          </p>
          <AddProduct />
        </div>
      </div>
    </>
  );
}

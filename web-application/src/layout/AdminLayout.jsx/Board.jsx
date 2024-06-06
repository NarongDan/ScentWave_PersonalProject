import AddProduct from "../../features/admin/components/AddProduct";
import ProductManagement from "../../features/admin/components/ProductManagement";
import ProductTable from "../../features/admin/components/ProductTable";

export default function Board() {
  return (
    <>
      <div className="h-full w-full p-10 bg-gray-100">
        <div className="h-full w-full bg-white rounded-lg p-10 space-y-5">
          <ProductManagement />
        </div>
      </div>
    </>
  );
}

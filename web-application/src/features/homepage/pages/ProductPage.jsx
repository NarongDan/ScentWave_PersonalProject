import { useState } from "react";
import useCommercial from "../../../hooks/useCommercial";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
  const { products } = useCommercial();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  // คำนวณหน้าที่ต้องการแสดง
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  /// Search

  const filteredProducts = products?.filter((item) =>
    item.productName.toLowerCase().includes(search)
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // เมื่อค้นหาเปลี่ยนให้กลับไปที่หน้าแรก
  };

  return (
    <>
      <div className="w-full min-h-[40em] py-10 px-5 flex flex-col">
        <div className="flex justify-between items-center px-[10%]">
          <p className="text-center text-4xl text-black font-extrabold">
            Products
          </p>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              className="border border-gray-300 rounded-md py-2 px-10 focus:outline-none bg-white"
              placeholder="Search products..."
            />
            <span className="absolute left-0 top-0 mt-2 ml-3">
              <i className="fas fa-search text-gray-400"></i>
            </span>
          </div>
        </div>
        <div className="divide divide-y-2 bg-black"></div>
        <div className="flex justify-center w-full px-12 mt-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-[100px]">
            {search == ""
              ? currentProducts.map((item) => (
                  <ProductCard product={item} key={item.id} />
                ))
              : filteredProducts.map((item) => (
                  <ProductCard product={item} key={item.id} />
                ))}
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-1 rounded-full bg-gray-200 hover:bg-yellow-400 cursor-pointer"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handleChangePage(index + 1)}
              className={`px-3 py-1 mx-1 rounded-full ${
                currentPage === index + 1
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 mx-1 rounded-full bg-gray-200 hover:bg-yellow-400 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

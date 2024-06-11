import { useState } from "react";
import useCommercial from "../../../hooks/useCommercial";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
  const { products } = useCommercial();
  const [search, setSearch] = useState("");

  const filteredProducts = products?.filter((item) =>
    item.productName.toLowerCase().includes(search)
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  console.log(filteredProducts);

  return (
    <>
      <div className="w-full min-h-[40em] py-10 px-5 flex flex-col ">
        <div className="flex justify-between items-center px-[10%] ">
          <p className="text-center text-4xl text-black font-extrabold">
            Products
          </p>
          <input type="text" value={search} onChange={handleSearch} />
        </div>
        <div className="divide divide-y-2 bg-black"></div>
        <div className="flex justify-center w-full px-12 mt-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-[100px]">
            {search == ""
              ? products.map((item) => (
                  <ProductCard product={item} key={item.id} />
                ))
              : filteredProducts.map((item) => (
                  <ProductCard product={item} key={item.id} />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

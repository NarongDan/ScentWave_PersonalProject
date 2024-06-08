import useCommercial from "../../hooks/useCommercial";
import BannerSlide from "./components/BannerSlide";
import ProductCard from "./components/ProductCard";

export default function HomePageBody() {
  const { products } = useCommercial();
  return (
    <>
      <div>
        <BannerSlide className=" w-[100%]" />
      </div>
      <div className="h-[100px] w-full flex flex-col justify-center items-center space-y-10 mt-10 px-2 text-center">
        <p className="text-2xl text-gray-500">Welcome to our store!</p>
        <p className="text-xl text-gray-500 ">
          Explore our extensive selection of fragrances available for purchase.
        </p>
      </div>
      <div className="flex justify-center w-full px-12 mt-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-[100px]">
          {products.slice(0, 8).map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
}

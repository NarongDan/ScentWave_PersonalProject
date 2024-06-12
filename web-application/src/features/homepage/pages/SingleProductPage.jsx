import useCommercial from "../../../hooks/useCommercial";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";

export default function SingleProductPage() {
  const { products } = useCommercial();
  const { productName } = useParams();
  const decodedProductName = decodeURIComponent(productName); //decode ชื่อใน url ที่มีเว้นวรรค
  const singleProduct = products.find(
    (product) => product.productName === decodedProductName
  );

  const getRandomProducts = (num) => {
    const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
    return shuffledProducts.slice(0, num);
  };

  const randomProducts = getRandomProducts(4);

  if (!singleProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/2">
            <img
              src={
                singleProduct.productImage ||
                "https://via.placeholder.com/600x800"
              }
              alt="Product"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 md:ml-8 mt-6 md:mt-0">
            <h2 className="text-3xl font-bold text-gray-800">
              {singleProduct.productName}
            </h2>
            <p className="text-gray-600 mt-4">{singleProduct.productDetail}</p>

            <div className="mt-6">
              <span className="text-2xl font-bold text-gray-800">
                THB{singleProduct.productPrice}
              </span>
            </div>
            <div className="mt-6">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* Recommended Products */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Recommended Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {randomProducts.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      </section>
    </div>
  );
}

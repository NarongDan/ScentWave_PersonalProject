import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";

export default function ProductCard({ product }) {
  const { handleQuantity, handleAddToCart } = useCart();
  const { authUser } = useAuth();

  const encodedProductName = encodeURIComponent(product.productName); // แปลงชื่อใน url

  return (
    <div className="flex flex-col p-2 items-center w-[250px] h-[350px] bg-white rounded-md shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105">
      <Link to={`/product/${encodedProductName}`}>
        <img
          src={product.productImage}
          alt={product.productName}
          className="w-full h-48 rounded-t-md"
        />
      </Link>

      <div className="p-4 flex flex-col items-center justify-center">
        <h3 className="text-lg font-bold text-gray-900">
          {product.productName}
        </h3>

        {/* <p className="text-gray-600">{product.productDetail}</p> */}

        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-800 font-bold">
            {`THB ${product.productPrice}`}
          </span>
        </div>
      </div>
      <button
        className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-300"
        onClick={() => handleAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";

export default function ProductCard({ product }) {
  const { handleQuantity } = useCart();
  const { authUser } = useAuth();

  const handleAddToCart = () => {
    if (authUser) {
      // User is logged in, use handleQuantity function
      handleQuantity({
        userId: authUser?.id,
        productId: product?.id,
        amount: 1,
        productPrice: product.productPrice,
        productDetail: product.productDetail,
      });
    } else {
      // User is a guest, use local storage
      const cart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const existingProductIndex = cart.findIndex(
        (item) => item.productId === product.id
      );

      if (existingProductIndex > -1) {
        cart[existingProductIndex].amount += 1;
      } else {
        cart.push({
          productId: product.id,
          amount: 1,
          productPrice: product.productPrice,
          productName: product.productName,
          productImage: product.productImage,
          productDetail: product.productDetail,
        });
      }

      localStorage.setItem("guestCart", JSON.stringify(cart));
    }
  };

  return (
    <div className="flex flex-col items-center  w-[250px] h-[350px]  bg-white rounded-md shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105">
      <img
        src={product.productImage}
        alt={product.productName}
        className="w-full h-48  rounded-t-md  "
      />

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
        className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-600  transition-colors duration-300"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

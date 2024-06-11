import useAuth from "../../../hooks/useAuth";

export default function ShoppingBag({
  cart,
  handleQuantity,
  handleRemoveItem,
}) {
  const { authUser } = useAuth();
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl text-black font-bold mb-4">Shopping Bag</h2>
        <div className="space-y-6">
          {cart?.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.productId || item.id} // ปรับ key เพื่อรองรับทั้งสองกรณี
                className="flex flex-col lg:flex-row items-center justify-between p-4 border rounded-lg"
              >
                <img
                  src={item.productImage || item.product.productImage}
                  alt={item.productName || item.product.productName}
                  className="w-24 h-24 object-fit rounded-md mb-4 md:mb-0 md:mr-4"
                />

                <div className="flex-1 ml-4">
                  <h3 className="text-xl text-black font-semibold mb-2">
                    {item.productName || item.product.productName}
                  </h3>
                  <p className="text-gray-600 mb-2 hidden md:block">
                    {item.productDetail
                      ? item.productDetail.slice(0, 50)
                      : item.product && item.product.productDetail
                      ? item.product.productDetail.slice(0, 50)
                      : ""}
                  </p>
                  <div className="flex items-center mb-2">
                    <span className="text-gray-700 mr-2">Quantity:</span>
                    <button
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300"
                      onClick={() =>
                        handleQuantity({
                          productId: item.productId || item.product.id,
                          amount: -1,
                        })
                      }
                    >
                      -
                    </button>
                    <span className="mx-2">{item.amount}</span>
                    <button
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300"
                      onClick={() =>
                        handleQuantity({
                          productId: item.productId || item.product.id,
                          amount: 1,
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-gray-700 mr-2">Price per item:</span>
                    <span>
                      THB{item.productPrice || item.product.productPrice}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {`Total: THB${
                      item.amount *
                      (item.productPrice || item.product.productPrice)
                    }`}
                  </div>
                </div>

                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-4 md:mt-0"
                  onClick={() =>
                    handleRemoveItem(authUser ? item.id : item.productId)
                  }
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div>No items available</div>
          )}
        </div>
      </div>
    </>
  );
}

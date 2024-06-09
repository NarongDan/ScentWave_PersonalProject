import { useNavigate } from "react-router-dom";

export default function OrderSummary({ cart }) {
  const total = cart.reduce((acc, item) => {
    return (acc += item.amount * item.productPrice);
  }, 0);

  const navigate = useNavigate();

  const handleProcessToCheckout = () => {
    navigate("/billing");
  };

  return (
    <div className="bg-white pt-5 px-10 py-5 space-y-5 border border-gray-300 w-full md:w-1/2 rounded-lg shadow-lg">
      <p className="text-black text-xl font-bold text-center">Order Summary</p>
      <div className="flex flex-col md:flex-row justify-between text-gray-700 text-lg">
        <p>Subtotal</p>
        <p>THB{total}</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between text-gray-700 text-lg">
        <p>Shipping</p>
        <p>THB 0</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between text-gray-700 text-lg">
        <p>Tax</p>
        <p>THB 0</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between text-gray-900 text-xl font-semibold border-t pt-4">
        <p>Total Payment</p>
        <p>{total}</p>
      </div>
      <button
        className="bg-yellow-400 text-white text-lg font-semibold py-2 px-4 rounded-lg w-full hover:bg-yellow-600"
        onClick={handleProcessToCheckout}
      >
        Proceed to checkout
      </button>
    </div>
  );
}

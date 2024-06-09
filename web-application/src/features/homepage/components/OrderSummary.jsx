export default function OrderSummary() {
  return (
    <div className="bg-white pt-5 px-10 py-5 space-y-5 border border-gray-300 w-full md:w-1/2 rounded-lg shadow-lg">
      <p className="text-black text-xl font-bold text-center">Order Summary</p>
      <div className="flex flex-col md:flex-row justify-between text-gray-700 text-lg">
        <p>Subtotal</p>
        <p>$0.00</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between text-gray-700 text-lg">
        <p>Shipping</p>
        <p>THB0.00</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between text-gray-700 text-lg">
        <p>Tax</p>
        <p>$0.00</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between text-gray-900 text-xl font-semibold border-t pt-4">
        <p>Total Payment</p>
        <p>$0.00</p>
      </div>
      <button className="bg-yellow-400 text-white text-lg font-semibold py-2 px-4 rounded-lg w-full hover:bg-yellow-600">
        Checkout
      </button>
    </div>
  );
}

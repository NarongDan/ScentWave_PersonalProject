import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cartApi from "../../../apis/cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner";

export default function CheckoutPage() {
  const { authUser } = useAuth();
  const { cart, getAllProductsinCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + item.productPrice * item.amount,
    0
  );

  const [paySlip, setPaySlip] = useState(null);
  const [payDate, setPayDate] = useState(new Date());
  const [payTime, setPayTime] = useState("");
  const [loading, setLoading] = useState(false);

  //   {
  //               userId: authUser.id,
  //               payDate: payDate,
  //               payTime: payTime,
  //               slipImage: paySlip,
  //               carts: cart,
  //             }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    const carts = cart.map((item) => ({
      productId: item.productId,
      productPrice: item.productPrice,
      productCost: item.product.productCost,
      amount: item.amount,
    }));

    carts.forEach((cartItem, index) => {
      for (const key in cartItem) {
        formData.append(`carts[${index}][${key}]`, cartItem[key]);
      }
    }); // ใส่ข้อมูลในตะกร้า

    formData.append("userId", authUser.id);
    formData.append("payDate", payDate);
    formData.append("payTime", payTime);
    formData.append("slipImage", paySlip); // ใส่ข้อมูลในบิล

    try {
      await cartApi.createBill(formData);
      toast.success("Place order successfully");

      await cartApi.deleteCart(authUser.id);
      getAllProductsinCart(); // ให้ render cart ใหม่ จะได้แสดงเป็น 0
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setPaySlip(e.target.files[0]);
  };

  return (
    <>
      {loading && <Spinner transparent className="z-50" />}
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
          <h1 className="text-2xl text-black font-bold mb-6">
            Billing Information
          </h1>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-500">
              Buyer Information
            </h2>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <p>First Name</p>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full p-2 bg-white border border-gray-300 rounded"
                    value={authUser?.firstName}
                    disabled
                  />
                </div>
                <div className="flex-1">
                  <p>Last Name</p>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-2 bg-white border border-gray-300 rounded"
                    value={authUser?.lastName}
                    disabled
                  />
                </div>
              </div>

              <p>Address</p>
              <input
                type="text"
                placeholder="Shipping Address"
                className="w-full p-2 bg-white border border-gray-300 rounded"
                value={authUser?.address}
                disabled
              />
              <p>Phone Number</p>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-2 bg-white border border-gray-300 rounded"
                value={authUser?.phone}
                disabled
              />
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-500">
              Purchased Items
            </h2>
            <ul className="divide-y divide-gray-200">
              {cart?.map((item) => (
                <li key={item.id} className="py-2 flex justify-between">
                  <div>
                    <span>{item.product.productName}</span>
                    <span className="text-gray-500"> (x{item.amount})</span>
                  </div>
                  <span>THB{item.productPrice * item.amount}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center font-bold text-lg mt-4">
            <span>Total Price:</span>
            <span>THB{total}</span>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-500">
              Bank Transfer Details
            </h2>
            <div className="mb-4">
              <p>Bank Name: Siam Commercial Bank</p>
              <p>Account Name: Narong Account</p>
              <p>Account Number: 123-456-789</p>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-500">
                Upload Proof of Transfer:
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {paySlip && (
              <div className="mb-4">
                <p className="text-green-600">File selected: {paySlip.name}</p>
              </div>
            )}

            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-500">
                Payment Date:
              </label>
              <DatePicker
                selected={payDate}
                onChange={(date) => setPayDate(date)}
                className="w-full p-2 border border-gray-300 rounded bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-500">
                Payment Time:
              </label>
              <input
                type="time"
                value={payTime}
                onChange={(e) => setPayTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-500"
              />
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-4 bg-yellow-300 text-white p-2 rounded hover:bg-yellow-600 transition duration-300"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

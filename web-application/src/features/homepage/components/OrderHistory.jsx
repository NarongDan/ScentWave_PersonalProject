import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import billApi from "../../../apis/bills";
import Modal from "../../../components/Modal";

export default function OrderHistory() {
  const [myBill, setMyBill] = useState([]);
  const [billDetail, setBillDetail] = useState([]);
  const [billSaleTotal, setBillSaleTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { authUser } = useAuth();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === 27) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (authUser) {
      fetchMyBill(); //แก้ปัญหา กด refresh แล้ว bills ไม่แสดง เลยให้มี authUser ก่อนแล้วค่อย fetch มา
    }
  }, [authUser]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const fetchMyBill = async () => {
    try {
      const res = await billApi.getBillByUserId(authUser.id);
      setMyBill(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBillDetail = async (billId) => {
    try {
      const res = await billApi.getBillDetailByBillId(billId);
      setBillDetail(res.data.result);
      const total = res.data.result.reduce(
        (acc, curr) => acc + curr.productPrice * curr.amount,
        0
      );
      setBillSaleTotal(total);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-black text-3xl font-bold ml-3 mb-5 p-4">
          Order History
        </h1>
        <div className="overflow-x-auto">
          <table className="w-4/5 divide-y divide-gray-200 mx-auto">
            <thead className="bg-yellow-500 rounded-t-md">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider ">
                  Bill ID
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                  PAY DATE
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                  PAY TIME
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myBill.length > 0 ? (
                myBill.map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          fetchBillDetail(item.id);
                          openModal();
                        }}
                      >
                        {item.id}
                      </button>
                    </td>

                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      {new Date(item.payDate).toLocaleString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "Asia/Bangkok",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      {item.payTime}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      {item.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No bills available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isOpen && (
        <Modal title="Bill Detail" closeModal={closeModal}>
          <div className="overflow-x-auto ">
            <table className="min-w-full] divide-y divide-gray-200 ">
              <thead className="bg-yellow-500">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Product ID
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Name
                  </th>

                  <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                    PRODUCT PRICE
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                    AMOUNT
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    TOTAL
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {billDetail.length > 0 ? (
                  billDetail.map((item, index) => (
                    <tr
                      key={item.id}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="px-2 py-3 whitespace-nowrap text-center">
                        {item.productId}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.product.productName}
                      </td>

                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        {item.productPrice}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        {item.amount}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <p>{`${+item.productPrice * +item.amount}`}</p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No products available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="text-center text-white font-bold">
            Total : {billSaleTotal}
          </p>
        </Modal>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import axios from "../../../config/axios";
import Modal from "../../../components/Modal";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner";
import billApi from "../../../apis/bills";

export default function OrderManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [customerModal, setCustomerModal] = useState(false);
  const [bills, setBills] = useState([]);
  const [billDetail, setBillDetail] = useState([]);
  const [billSaleTotal, setBillSaleTotal] = useState(0);
  const [customerDetail, setCustomerDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // เพิ่มสถานะสำหรับหน้า
  const itemsPerPage = 20; // จำนวนรายการต่อหน้า

  useEffect(() => {
    fetchBills();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === 27) {
        closeModal();
        closeCustomerModal();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const fetchBills = async () => {
    try {
      const res = await axios.get("/bills");
      setBills(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBillDetail = async (billId) => {
    try {
      const res = await billApi.getBillDetailByBillId(billId);
      setBillDetail(res.data.result);
      // คำนวณยอดรวมของสินค้าในแต่ละบิล
      const total = res.data.result.reduce(
        (acc, curr) => acc + curr.productPrice * curr.amount,
        0
      );
      setBillSaleTotal(total);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomerDetail = async (userId) => {
    try {
      const res = await axios.get(`/users/info/${userId}`);
      setCustomerDetail(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const ChangeToDelivered = async (billId) => {
    try {
      const button = await Swal.fire({
        text: "Status",
        title: "Change to DELIVERED",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        const res = await axios.patch(`/bills/${billId}`, {
          status: "DELIVERED",
        });

        if (res.data.data.status === "DELIVERED") {
          setLoading(true);
          Swal.fire({
            title: "Status",
            text: "DELIVERED",
            icon: "success",
            timer: 1000,
          });

          fetchBills();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const ChangeToCancelled = async (billId) => {
    try {
      const button = await Swal.fire({
        text: "Status",
        title: "Change to CANCELLED",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        setLoading(true);
        const res = await axios.patch(`/bills/${billId}`, {
          status: "CANCELLED",
        });

        if (res.data.data.status === "CANCELLED") {
          Swal.fire({
            title: "Status",
            text: "CANCELLED",
            icon: "success",
            timer: 1000,
          });

          fetchBills();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openCustomerModal = () => setCustomerModal(true);
  const closeCustomerModal = () => setCustomerModal(false);

  // คำนวณรายการที่จะแสดงในหน้าปัจจุบัน
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBills = bills.slice(indexOfFirstItem, indexOfLastItem); // ทำการ slice เอาข้อมูลแต่ละหน้า เช่น หน้าแรก ก็จะเริ่มที่ 0 ถึง 19 (slice(0,20))

  // จำนวนหน้าทั้งหมด
  const totalPages = Math.ceil(bills.length / itemsPerPage); // ปัดเลขขึ้น

  return (
    <>
      <p className="text-2xl text-black font-semibold">Order Management</p>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                Bil ID
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                SLIP IMAGE
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                CUSTOMER ID
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
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentBills.length > 0 ? (
              currentBills.map((item, index) => {
                return (
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
                    <td className="px-2 py-3 whitespace-nowrap">
                      <img
                        src={item.slipImage}
                        alt="Product"
                        className="w-full h-24 rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          fetchCustomerDetail(item.userId);
                          openCustomerModal(true);
                        }}
                      >
                        {item.userId}
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
                    <td className="px-6 py-4 text-center space-x-4 whitespace-nowrap">
                      <button
                        className="btn btn-accent"
                        onClick={() => ChangeToDelivered(item.id)}
                      >
                        DELIVERED
                      </button>
                      <button
                        className="btn btn-error"
                        onClick={() => ChangeToCancelled(item.id)}
                      >
                        CANCELLED
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No bills available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="flex justify-center space-x-2 my-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {/*  แปล Array.from({ length: 5 }, (v, i) => i);
// [0, 1, 2, 3, 4]*/}
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
      {loading && <Spinner transparent className="z-50" />}
      {isOpen && (
        <Modal title="Bill Detail" closeModal={closeModal}>
          <div className="overflow-x-auto ">
            <table className="min-w-full] divide-y divide-gray-200">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Product ID
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    PRODUCT COST
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
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {item.productCost}
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

      {customerModal && (
        <Modal title="Bill Detail" closeModal={closeCustomerModal}>
          <div className="overflow-x-auto ">
            <table className="min-w-full] divide-y divide-gray-200">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    First Name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Last Name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                    Address
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-2 py-3 whitespace-nowrap text-center">
                    {customerDetail.id}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {customerDetail.firstName}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {customerDetail.lastName}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    {customerDetail.email}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    {customerDetail.phone}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <p>{customerDetail.address}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </>
  );
}

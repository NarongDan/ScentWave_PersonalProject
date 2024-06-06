import { useState } from "react";
import axios from "../../../config/axios";
import { toast } from "react-toastify";

import Spinner from "../../../components/Spinner";

const initialInput = {
  productName: "",
  productCost: "",
  productPrice: "",
  productImage: "",
  productDetail: "",
};
export default function AddProduct() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState(initialInput);
  const [loading, setLoading] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleChange = (e) => {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("productName", input.productName);
    uploadData.append("productCost", input.productCost);
    uploadData.append("productPrice", input.productPrice);
    uploadData.append("productImage", input.productImage);
    uploadData.append("productDetail", input.productDetail);

    try {
      setLoading(true);
      await axios.post("/products", uploadData);

      toast.success("Product uploaded successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };
  console.log(input);
  return (
    <>
      <button className="btn btn-active" onClick={openModal}>
        <i className="fa fa-plus"></i> Add Product
      </button>
      {loading && <Spinner transparent className="z-50" />}
      {isOpen && (
        <div className="modal modal-open z-40">
          <div className="modal-box">
            <h2 className="font-bold text-xl text-center">Add product</h2>

            <form
              className="p-4 flex flex-col space-y-5"
              onSubmit={handleUpdate}
            >
              <p>Product Name</p>
              <input
                type="text"
                className="px-4 py-3 text-md rounded-lg focus:outline-none"
                name="productName"
                value={input.productName}
                onChange={handleChange}
              />
              <p>Product Cost</p>
              <input
                type="text"
                className="px-4 py-3 text-md rounded-lg focus:outline-none"
                name="productCost"
                value={input.productCost}
                onChange={handleChange}
              />
              <p>Product Price</p>
              <input
                type="text"
                className="px-4 py-3 text-md rounded-lg focus:outline-none"
                name="productPrice"
                value={input.productPrice}
                onChange={handleChange}
              />
              <p>Product Image</p>
              <input
                type="file"
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    productImage: e.target.files[0],
                  }))
                }
              />
              <p>Product Detail</p>
              <textarea
                className="p-4 resize-none rounded-lg"
                rows="4"
                placeholder="Write description here..."
                name="productDetail"
                value={input.productDetail}
                onChange={handleChange}
              ></textarea>
              <button className="btn btn-active">Upload</button>
            </form>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

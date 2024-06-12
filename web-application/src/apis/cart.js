import axios from "../config/axios";

const cartApi = {};

cartApi.getAllProductsInCart = () => axios.get("/users/myCart");

cartApi.adjustItemNumber = (data) => axios.post(`/users/myCart`, data); //data = {productId/ amount}

cartApi.deleteCartItem = (cartItemId) =>
  axios.delete(`/users/myCart/${cartItemId}`); // productId in each cart

cartApi.createBill = (data) => axios.post("/bills", data); // data ={userId, payDate, payTime, slipImage, carts : [{productId, productPrice, productCost, amount}] }

cartApi.deleteCart = (id) => axios.delete(`/users/myCart/delete/${id}`);

cartApi.addCartFromGuest = (data) => axios.post("/carts/cartFromGuest", data);

export default cartApi;

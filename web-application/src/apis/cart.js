import axios from "../config/axios";

const cartApi = {};

cartApi.getAllProductsInCart = () => axios.get("/users/myCart");

cartApi.adjustItemNumber = (data) => axios.post(`/users/myCart`, data);

//data = {productId/ amount}

cartApi.deleteCartItem = (cartItemId) =>
  axios.delete(`users/myCart/${cartItemId}`);

// productId in each cart
export default cartApi;

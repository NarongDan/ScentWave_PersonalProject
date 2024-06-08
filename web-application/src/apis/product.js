import axios from "../config/axios";

const productApi = {};

productApi.getAllProducts = () => axios.get("/products");
export default productApi;

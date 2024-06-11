import axios from "../config/axios";

const billApi = {};

billApi.getBillByUserId = (userId) => axios.get(`bills/${userId}`);

billApi.getBillDetailByBillId = (billId) =>
  axios.get(`/bills/each/detail/${billId}`);

export default billApi;

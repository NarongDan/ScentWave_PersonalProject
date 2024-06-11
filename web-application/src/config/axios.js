import axios from "axios";
import { getAccessToken, removeAccessToken } from "../utils/local-storage";

// แก้ baseurl ไว้
axios.defaults.baseURL = "http://localhost:8888";

console.log(axios.defaults.baseURL);

axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (value) => Promise.resolve(value),
  (err) => {
    if (err.response.status === 401) {
      removeAccessToken();
      // window.location.assign("/login"); // ทำการ refresh page แล้ว redirect ไปที่ path นี้
      return;
    }
    return Promise.reject(err);
  }
); // return value กลับไปเป็น promise ใน callback แรก, callbackที่สองใช้เช็ค error ว่า หาก tokenมีปัญหา ให้ลบtoken แล้วให้ redirect ไปหน้า Login
export default axios;

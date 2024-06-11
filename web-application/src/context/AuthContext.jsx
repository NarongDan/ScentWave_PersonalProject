import React from "react";
import { createContext } from "react";
import authApi from "../apis/auth";
import {
  setAccessToken,
  removeAccessToken,
  getAccessToken,
} from "../utils/local-storage";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthUserLoading, setIsAuthUserLoading] = useState(true);

  const fetchUser = async () => {
    try {
      // ในหน้า homepage เมื่อกด refresh
      if (getAccessToken()) {
        // เช็คว่ามี token ไหม
        const res = await authApi.getAuthUser();
        setAuthUser(res.data.data); // fetchdata ของ user ในกรณีที่มีการ login ไว้แล้ว  หากtoken มีปัญหา หรือหมดอายุ ต้องทำอะไรบางอย่าง  ที่เขียนไว้ใน interceptors ของ axios ตรง response.use
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsAuthUserLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // useEffect จะทำงานตามลำดับ  ตัวบนจะเสร็จก่อนตัวล่าง // ไม่สามารถใช้ async /await ใน useEffect ได้ ต้องสร้างfn wrapper ขึ้นมาใช้แทน

  const login = async (credentials) => {
    const res = await authApi.login(credentials);

    setAccessToken(res.data.accessToken);

    const resGetAuthUser = await authApi.getAuthUser(); // ค่าที่ได้มาจาก axios

    setAuthUser(resGetAuthUser.data.data); //
    return res.data;
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
    toast.warning("logout already");
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, authUser, isAuthUserLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

import Spinner from "../../../components/Spinner";

export default function ProtectRoute({ children }) {
  const { authUser, isAuthUserLoading } = useAuth();

  if (!authUser && !isAuthUserLoading) {
    //ถ้า authUser ไม่มีค่า  ให้redirect ไปหน้า login // ใช้ isAuthUserLoading เช็คก่อนว่ากำลังโหลดไหม เพราะตอนนั้น authUser จะยังเป็น null อยู่
    return <Navigate to="/login/" />;
  }

  return (
    <>
      {isAuthUserLoading && <Spinner />}

      {children}
    </>
  );
}

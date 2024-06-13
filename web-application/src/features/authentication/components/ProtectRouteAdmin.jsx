import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/Spinner";
import { useEffect } from "react";

export default function ProtectRouteAdmin({ children }) {
  const { authUser, isAuthUserLoading } = useAuth();

  const navigate = useNavigate();

  if (!authUser && !isAuthUserLoading) {
    navigate("/");
  }

  if (authUser?.isAdmin === false) {
    navigate("/");
  }

  return (
    <>
      {isAuthUserLoading && <Spinner />}

      {children}
    </>
  );
}

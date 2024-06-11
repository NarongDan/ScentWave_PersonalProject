import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/Spinner";

export default function ProtectProfileRoute({ children }) {
  const { authUser, isAuthUserLoading } = useAuth();

  if (authUser && !isAuthUserLoading) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      {isAuthUserLoading && <Spinner />}
      {children}
    </>
  );
}

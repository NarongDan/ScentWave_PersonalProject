import AuthContextProvider from "./context/AuthContext";
import CommercialContextProvider from "./features/homepage/context/CommercialContext";
import Router from "./route";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <CommercialContextProvider>
      <AuthContextProvider>
        <Router />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </AuthContextProvider>
    </CommercialContextProvider>
  );
}

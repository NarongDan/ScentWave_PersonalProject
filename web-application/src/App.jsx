import AuthContextProvider from "./context/AuthContext";
import CartContextProvider from "./features/homepage/context/CartContext";
import CommercialContextProvider from "./features/homepage/context/CommercialContext";
import Router from "./route";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <CommercialContextProvider>
      <AuthContextProvider>
        <CartContextProvider>
          <Router />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </CartContextProvider>
      </AuthContextProvider>
    </CommercialContextProvider>
  );
}

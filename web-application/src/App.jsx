import AuthContextProvider from "./context/AuthContext";
import Router from "./route";
import { ToastContainer } from "react-toastify";


export default function App() {
  return (
    <AuthContextProvider>
      <Router />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </AuthContextProvider>
  );
}

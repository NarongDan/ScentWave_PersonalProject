import { useContext } from "react";
import { CartContext } from "../features/homepage/context/CartContext";

export default function useCart() {
  return useContext(CartContext);
}

import { useEffect, useReducer } from "react";
import { createContext, useState } from "react";
import CartReducer from "./cartReducer";
import cartApi from "../../../apis/cart";
import useAuth from "../../../hooks/useAuth";

export const CartContext = createContext();

// const initialState = {
//     productId:"",
//     amount: 0,
//     productPrice: 0

// }

export default function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(CartReducer, []);

  console.log(cart);

  const getAllProductsinCart = async () => {
    try {
      const res = await cartApi.getAllProductsInCart();

      dispatch({ type: "SET_CART", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantity = async (data) => {
    try {
      await cartApi.adjustItemNumber(data);
      getAllProductsinCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await cartApi.deleteCartItem(cartItemId);
      getAllProductsinCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProductsinCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, dispatch, handleQuantity, handleRemoveItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

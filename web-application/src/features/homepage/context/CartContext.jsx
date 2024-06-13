import { useEffect, useReducer } from "react";
import { createContext, useState } from "react";
import CartReducer from "./cartReducer";
import cartApi from "../../../apis/cart";
import { getAccessToken } from "../../../utils/local-storage";
import useAuth from "../../../hooks/useAuth";

export const CartContext = createContext();

// const initialState = {
//     productId:"",
//     amount: 0,
//     productPrice: 0

// }

export default function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(CartReducer, []);
  const [authorized, setAuthorized] = useState(false);
  const { authUser } = useAuth();
  const [refresh, setRefresh] = useState(false); // ให้ re-render ใหม่เมื่อมีการอัพเดทสินค้าในtoken

  const [cartItemCount, setCartItemCount] = useState(0);

  // ตรวจสอบหากผู้ใช้ไม่ได้ล็อกอิน ให้ใช้ตะกร้าจาก local storage
  const guestCart = !authUser
    ? JSON.parse(localStorage.getItem("guestCart")) || []
    : [];

  // ใช้ตะกร้าที่ถูกต้องขึ้นอยู่กับสถานะการล็อกอินของผู้ใช้
  const currentCart = authUser ? cart : guestCart;

  useEffect(() => {
    // เมื่อค่าของ currentCart เปลี่ยนแปลง ให้อัปเดตจำนวนรายการในตะกร้า
    setCartItemCount(currentCart.length);
  }, [currentCart]); // ระบุ currentCart เป็น dependency เพื่อให้ useEffect เรียกใช้งานเมื่อค่าเปลี่ยน

  const getAllProductsinCart = async () => {
    try {
      const res = await cartApi.getAllProductsInCart();

      dispatch({ type: "SET_CART", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // ป้องกัน infinite loop ในกรณีที่หาtoken ไม่เจอ
    if (authorized) {
      getAllProductsinCart();
    }
  }, [authorized]); //

  useEffect(() => {
    const token = getAccessToken();
    setAuthorized(!!token); // Set authorized to true if token exists, false otherwise
  }, []);

  const handleQuantity = async (data) => {
    if (authUser) {
      // ถ้าผู้ใช้ล็อกอินอยู่, เรียกใช้ API
      try {
        await cartApi.adjustItemNumber(data);
        getAllProductsinCart();
      } catch (error) {
        console.log(error);
      }
    } else {
      // ถ้าผู้ใช้เป็น guest, ปรับข้อมูลใน local storage
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const itemIndex = guestCart.findIndex(
        (item) => item.productId === data.productId
      );

      if (itemIndex > -1) {
        guestCart[itemIndex].amount += data.amount;
        if (guestCart[itemIndex].amount <= 0) {
          guestCart.splice(itemIndex, 1); // ลบสินค้าถ้าจำนวน <= 0
        }
      }

      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      setRefresh(!refresh);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    if (authUser) {
      // ถ้าผู้ใช้ล็อกอินอยู่, เรียกใช้ API

      try {
        await cartApi.deleteCartItem(cartItemId);
        getAllProductsinCart();
      } catch (error) {
        console.log(error);
      }
    } else {
      // ถ้าผู้ใช้เป็น guest, ลบสินค้าใน local storage
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const updatedCart = guestCart.filter(
        (item) => item.productId !== cartItemId
      );

      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      setRefresh(!refresh);
    }
  };

  const handleAddToCart = (product) => {
    if (authUser) {
      // User is logged in, use handleQuantity function
      handleQuantity({
        userId: authUser?.id,
        productId: product?.id,
        amount: 1,
        productPrice: product.productPrice,
        productDetail: product.productDetail,
      });
    } else {
      // User is a guest, use local storage
      const cart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const existingProductIndex = cart.findIndex(
        (item) => item.productId === product.id
      );

      if (existingProductIndex > -1) {
        cart[existingProductIndex].amount += 1;
      } else {
        cart.push({
          productId: product.id,
          amount: 1,
          productPrice: product.productPrice,
          productName: product.productName,
          productImage: product.productImage,
          productDetail: product.productDetail,
        });
      }

      localStorage.setItem("guestCart", JSON.stringify(cart));
      setRefresh(!refresh);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,
        handleQuantity,
        handleRemoveItem,
        handleAddToCart,
        getAllProductsinCart,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

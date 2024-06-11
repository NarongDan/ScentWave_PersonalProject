import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import OrderSummary from "../components/OrderSummary";
import ShoppingBag from "../components/ShoppingBag";

export default function CartPage() {
  const { cart, handleQuantity, handleRemoveItem } = useCart();

  const { authUser } = useAuth();

  // ตรวจสอบหากผู้ใช้ไม่ได้ล็อกอิน ให้ใช้ตะกร้าจาก local storage
  const guestCart = !authUser
    ? JSON.parse(localStorage.getItem("guestCart")) || []
    : [];

  // ใช้ตะกร้าที่ถูกต้องขึ้นอยู่กับสถานะการล็อกอินของผู้ใช้
  const currentCart = authUser ? cart : guestCart;

  useEffect(() => {}, [currentCart]);

  return (
    <div className="w-full min-h-[40em] py-10 px-5 flex flex-col  ">
      <div className="text-center text-3xl font-bold text-black mb-10">
        My Cart
      </div>
      <div className="flex justify-between w-full min-h-[20rem] ">
        <div className="flex-1 p-6 pl-14 ">
          <ShoppingBag
            cart={currentCart}
            handleQuantity={handleQuantity}
            handleRemoveItem={handleRemoveItem}
          />
        </div>

        <div className=" flex-1 flex flex-col items-center py-10">
          <OrderSummary cart={currentCart} />
        </div>
      </div>
    </div>
  );
}

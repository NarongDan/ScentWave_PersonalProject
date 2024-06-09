import cartApi from "../../../apis/cart";
import useCart from "../../../hooks/useCart";
import OrderSummary from "../components/OrderSummary";
import ShoppingBag from "../components/ShoppingBag";

export default function CartPage() {
  const { cart, handleQuantity, handleRemoveItem } = useCart();

  return (
    <div className="w-full min-h-[40em] py-10 px-5 flex flex-col  bg-gray-50">
      <div className="text-center text-3xl font-bold text-black mb-10">
        My Cart
      </div>
      <div className="flex justify-between w-full min-h-[20rem] ">
        <div className="flex-1 p-6 pl-14 bg-gray-50">
          <ShoppingBag
            cart={cart}
            handleQuantity={handleQuantity}
            handleRemoveItem={handleRemoveItem}
          />
        </div>

        <div className="bg-gray-50 flex-1 flex flex-col items-center py-10">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

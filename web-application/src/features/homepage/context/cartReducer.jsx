const CartReducer = (state, action) => {
  if (action.type === "SET_CART") {
    return action.payload;
  }
};
export default CartReducer;

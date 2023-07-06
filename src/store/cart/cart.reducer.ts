import { setCartItems, setIsCartOpen } from "./cart.action";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { AnyAction } from "redux";

export type Cart_State = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};
export const CART_INITIAL_STATE: Cart_State = {
  isCartOpen: false,
  cartItems: [],
};

// export default (state = CART_INITIAL_STATE, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case CART_ACTION_TYPES.SET_CART_ITEMS:
//       return { ...state, cartItems: payload };
//     case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//       return { ...state, isCartOpen: payload };
//     default:
//       return state;
//   }
// };

export default (state = CART_INITIAL_STATE, action: AnyAction): Cart_State => {
  if (setIsCartOpen.match(action)) {
    return { ...state, isCartOpen: action.payload };
  }
  if (setCartItems.match(action)) {
    return { ...state, cartItems: action.payload };
  }
  return state;
};

import React, { FC } from "react";
import "./checkout-item.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  clearItemToCart,
  removeItemToCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CartItem } from "../../store/cart/cart.types";
export type CheckoutItemProps = {
  cartItem: CartItem;
};
const CheckoutItem = ({ cartItem }: CheckoutItemProps) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity } = cartItem;
  // const { clearItemToCart, addItemToCart, removeItemToCart } =
  //   useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const clearItemHandler = () => dispatch(clearItemToCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemToCart(cartItems, cartItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={addItemHandler}>
          &#10094;
        </div>
        <span className="value"> {quantity}</span>
        <div className="arrow" onClick={removeItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;

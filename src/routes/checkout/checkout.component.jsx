import React from "react";
import "./checkout.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
const Checkout = () => {
  const { cartItems, addItemToCart, removeItemToCart, cartTotal } =
    useContext(CartContext);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="headerblock">
          <span>Product</span>
        </div>
        <div className="headerblock">
          <span>Description</span>
        </div>
        <div className="headerblock">
          <span>Quantity</span>
        </div>
        <div className="headerblock">
          <span>Price</span>
        </div>
        <div className="headerblock">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem, index) => (
        <CheckoutItem key={index} cartItem={cartItem} />
      ))}
      <span className="total">Total: ${cartTotal}</span>
    </div>
  );
};

export default Checkout;

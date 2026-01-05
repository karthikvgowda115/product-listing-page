import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './CartIcon.css';

const CartIcon = ({ count }) => {
  return (
    <div className="cart-icon">
      <FaShoppingCart className="cart-icon__icon" />
      {count > 0 && (
        <span className="cart-icon__badge">{count}</span>
      )}
      <span className="cart-icon__text">Cart</span>
    </div>
  );
};

export default CartIcon;
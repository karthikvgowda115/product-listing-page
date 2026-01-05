import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaTruck, FaShieldAlt } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleCheckout = () => {
    setCheckoutLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Proceeding to checkout...');
      setCheckoutLoading(false);
    }, 1000);
  };

  if (cartCount === 0) {
    return (
      <div className="cart empty-cart">
        <div className="cart-icon-large">
          <FaShoppingBag />
        </div>
        <h2>Your Innerwear Cart is Empty</h2>
        <p>Add some comfortable innerwear to get started!</p>
        <Link to="/category/all" className="browse-btn">
          Browse Innerwear
        </Link>
      </div>
    );
  }

  const subtotal = cartTotal;
  const shipping = subtotal >= 1500 ? 0 : 99;
  const gst = subtotal * 0.12; // 12% GST for innerwear
  const total = subtotal + shipping + gst;

  return (
    <div className="cart">
      <div className="cart-container">
        {/* Cart Header */}
        <div className="cart-header">
          <h1>Your Innerwear Cart</h1>
          <p className="cart-count">{cartCount} item{cartCount > 1 ? 's' : ''} in cart</p>
          <button onClick={clearCart} className="clear-cart-btn">
            <FaTrash /> Clear Cart
          </button>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                <div className="item-image">
                  <img src={item.image_url} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  
                  <div className="item-attributes">
                    {item.selectedSize && (
                      <span className="attribute">Size: {item.selectedSize}</span>
                    )}
                    {item.selectedColor && (
                      <span className="attribute">Color: {item.selectedColor}</span>
                    )}
                    <span className="attribute">Material: {item.material}</span>
                  </div>
                </div>
                
                <div className="item-price">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
                
                <div className="item-quantity">
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="quantity-btn"
                  >
                    <FaMinus />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    <FaPlus />
                  </button>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'free-shipping' : ''}>
                {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
              </span>
            </div>
            
            <div className="summary-row">
              <span>GST (12%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span className="total-amount">₹{total.toFixed(2)}</span>
            </div>

            {/* Shipping Progress */}
            {subtotal < 1500 && (
              <div className="shipping-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(subtotal / 1500) * 100}%` }}
                  ></div>
                </div>
                <p className="shipping-message">
                  Add ₹{(1500 - subtotal).toFixed(2)} more for FREE shipping!
                </p>
              </div>
            )}

            {/* Checkout Button */}
            <button 
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="checkout-btn"
            >
              {checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}
              <FaTruck />
            </button>

            {/* Features */}
            <div className="cart-features">
              <div className="feature">
                <FaShieldAlt className="feature-icon" />
                <div>
                  <h4>Secure Payment</h4>
                  <p>100% secure & encrypted</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">↩️</span>
                <div>
                  <h4>Easy Returns</h4>
                  <p>30-day return policy</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">📞</span>
                <div>
                  <h4>Need Help?</h4>
                  <p>Call +91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="continue-shopping">
          <Link to="/category/all" className="continue-btn">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
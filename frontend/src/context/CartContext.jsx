import React, { createContext, useContext, useEffect, useState } from 'react';

// 1️⃣ Create context
const CartContext = createContext(null);

// 2️⃣ Custom hook (ONLY ONE useCart)
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
};

// 3️⃣ Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('innerwear_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [sessionId] = useState(() => {
    return (
      localStorage.getItem('innerwear_session_id') ||
      `session_${Date.now()}_${Math.random().toString(36).slice(2)}`
    );
  });

  // Persist session
  useEffect(() => {
    localStorage.setItem('innerwear_session_id', sessionId);
  }, [sessionId]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('innerwear_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const index = prev.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
      );

      if (index !== -1) {
        const updated = [...prev];
        updated[index].quantity += product.quantity || 1;
        return updated;
      }

      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Remove item
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  // Check cart
  const isInCart = (productId, size = null, color = null) => {
    return cartItems.some(
      (item) =>
        item.id === productId &&
        (size === null || item.selectedSize === size) &&
        (color === null || item.selectedColor === color)
    );
  };

  // Totals
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        sessionId,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isInCart,
        cartTotal,
        cartCount,
        cartItemCount: cartItems.length
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

import React, { createContext, useState } from 'react';

// Create a CartContext
export const CartContext = createContext();

// Provide the CartContext to the rest of the app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Add product to cart
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // If the item is already in the cart, increase its quantity
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Otherwise, add the new item to the cart with a quantity of 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    // Update total amount
    setTotalAmount(totalAmount + product.price);
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find((item) => item.id === id);

    if (itemToRemove) {
      // Update total amount
      setTotalAmount(totalAmount - itemToRemove.price * itemToRemove.quantity);
      setCartItems(cartItems.filter((item) => item.id !== id));
    }
  };

  // Increase product quantity
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

    const product = cartItems.find((item) => item.id === id);
    setTotalAmount(totalAmount + product.price);
  };

  // Decrease product quantity
  const decreaseQuantity = (id) => {
    const product = cartItems.find((item) => item.id === id);

    if (product.quantity === 1) {
      removeFromCart(id);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
      setTotalAmount(totalAmount - product.price);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

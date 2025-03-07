import React, { useState, useEffect, createContext, useContext } from "react";
import { products } from "../data/products";

// Create Store Context
export const StoreContext = createContext();

// Custom hook to use store context
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

// Store Provider Component
export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Load cart from local storage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("gymCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("gymCart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product, quantity = 1, color = "default") => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.color === color
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity, color }];
      }
    });

    setIsCartOpen(true);
    setTimeout(() => setIsCartOpen(false), 3000);
  };

  // Remove product from cart
  const removeFromCart = (productId, color = "default") => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === productId && item.color === color)
      )
    );
  };

  // Update product quantity
  const updateQuantity = (productId, quantity, color = "default") => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Handle complete order
  const handleCompleteOrder = () => {
    setOrderComplete(true);
    // Reset cart after order is complete
    setTimeout(() => {
      setCart([]);
      setOrderComplete(false);
    }, 5000);
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        orderComplete,
        handleCompleteOrder,
        clearCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

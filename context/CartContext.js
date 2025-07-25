"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {   // <--- EXPORT AQUÍ
  const [cart, setCart] = useState([]);

  const addToCart = (producto) => {
    setCart(prevCart => {
      const found = prevCart.find(p => p.id === producto.id);
      if (found) {
        return prevCart.map(p =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prevCart, { ...producto, cantidad: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(p => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const setQuantity = (id, cantidad) => {
    setCart(prevCart =>
      prevCart.map(p =>
        p.id === id ? { ...p, cantidad: Math.max(1, cantidad) } : p
      )
    );
  };

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, clearCart, setQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

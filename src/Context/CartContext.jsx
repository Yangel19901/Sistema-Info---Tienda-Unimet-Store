import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setTotal(prevTotal => prevTotal + parseFloat(product.price));
  };

  const removeFromCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
        setCart([...cart]);
      } else {
        const newCart = cart.filter(item => item.id !== product.id);
        setCart(newCart);
      }
      setTotal(prevTotal => prevTotal - parseFloat(product.price));
    }
  };
  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

import { useState, useEffect, useCallback } from 'react';

export function useCart() {
  const CART_STORAGE_KEY = 'miReinoCart';
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart data", e);
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
        return updatedCart;
      }
      
      return [...prevCart, { ...product, quantity: 1 }];
    });
    
    return `${product.name} añadido al carrito`;
  }, []);

  const removeFromCart = useCallback((index) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
  }, []);

  const updateQuantity = useCallback((index, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: newQuantity
      };
      return updatedCart;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getTotal = useCallback(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  }, [cart]);

  return {
    cart,
    cartCount: cart.reduce((count, item) => count + item.quantity, 0),
    cartTotal: getTotal(),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
}
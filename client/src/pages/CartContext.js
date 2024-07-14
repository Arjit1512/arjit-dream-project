import React, { createContext, useContext, useReducer } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Define the reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [action.payload, ...state.cartItems],
      };
    // Add more cases for other actions if needed
    default:
      return state;
  }
};

// Define the CartProvider component
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

  // Define the addToCart function
  const addToCart = (item) => {
    console.log('Adding to cart:', item);
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  return (
    <CartContext.Provider value={{ state, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };

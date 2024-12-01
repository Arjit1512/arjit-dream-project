import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

const initialState = {
  cartItems: [],
  totalPrice: 0,
  checkedOutItems: [],
  user: null,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        cartItems: action.payload
      };
    case 'SET_TOTAL_PRICE':
      return {
        ...state,
        totalPrice: action.payload
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [action.payload, ...state.cartItems]
      };
    case 'CLEAR_CART':
      return {
        ...state,
        checkedOutItems: [...state.cartItems],
        cartItems: [],
        totalPrice: 0
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const fetchCart = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      dispatch({ type: 'SET_CART', payload: data.cart || [] });
      dispatch({ type: 'SET_TOTAL_PRICE', payload: data.totalPrice || 0 });
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const fetchUser = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      dispatch({ type: 'SET_USER', payload: data.user });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      fetchUser(token);
    }
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch, addToCart, clearCart, fetchCart, fetchUser }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };

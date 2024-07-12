import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const CartDetail = () => {
  const { state: { cartItems }, addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:3001/get-cart', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = response.data;
        addToCart(data.cartItems); // Add fetched cart items to context

        setLoading(false);
        console.log("Cart data fetched", data);

      } catch (error) {
        console.error("Error fetching cart data", error);
        setError('Error fetching cart data');
        setLoading(false);
      }
    };

    fetchCart();
  }, [addToCart]);

  const handleQuantityChange = async (productId, action, size) => {
    try {
      console.log(`Updating cart for product ${productId} with action ${action} and size ${size}`);
      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:3001/update-cart', {
        productId,
        action,
        size: size || null // Ensure size is sent as null if not applicable
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedCart = response.data.cartItems || [];
      addToCart(updatedCart); // Update context with updated cart items

      console.log('Update cart response:', response.data);

    } catch (error) {
      console.error("Error updating cart", error);
      setError('Error updating cart');
    }
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <>
        <h3 style={{ textAlign: "center" }}>Oops, you don't have anything in your cart! 😞</h3>
      </>
    );
  }

  return (
    <>
      <h1 className='heading-sale cart-head'>SHOPPING CART</h1>
      <div className='black-border'></div>

      {cartItems.map((item) => (
        // Add a null check for item to prevent accessing undefined properties
        item && (
          <div key={item._id} className='cart-class1'>
            <img src={`/images/pro${item.productId}.webp`} alt={`Product ${item.productId}`} />
            <div className='flex-col calvin1'>
              <h3>{item.name}</h3>
              <p className='quantity calvin1'>Quantity: {item.quantity}</p>
              {item.size && <p className='size calvin1'>Size: {item.size}</p>}
              <h3 className='itemprice'>INR {item.price}</h3>
              <div className='quantity-buttons'>
                <button className='quantity-button' onClick={() => handleQuantityChange(item.productId, 'decrease', item.size)}>-</button>
                <button className='quantity-button' onClick={() => handleQuantityChange(item.productId, 'increase', item.size)}>+</button>
              </div>
            </div>
            <div className='border-45'></div>
          </div>
        )
      ))}

      <div className='cart-class2'>
        <div className='inside'>
          <h2>ORDER SUMMARY</h2>
          {/* Calculate total price based on cartItems */}
          <h4><span>SUB TOTAL:</span> INR {cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}</h4>
          <h4><span>TAX AND DELIVERY CHARGES:</span> INR {100}</h4>
          <h4><span>TOTAL:</span> INR {cartItems.reduce((total, item) => total + (item.price * item.quantity), 0) + 100}</h4>
          <button className='last-button' onClick={handleDashboard}>CHECKOUT</button>
        </div>
      </div>
    </>
  );
};

export default CartDetail;

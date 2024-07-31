import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import imageMapping from './imageMapping';
import './Dashboard.css';

const CartDetail = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
  const navigate = useNavigate();
  const { state, dispatch } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated');
          setLoading(false);
          navigate('/login');
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-cart`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = response.data.cart[0]; // Assuming only one cart per user
        if (data && data.items.length > 0) {
          dispatch({ type: 'SET_CART', payload: data.items });
          dispatch({ type: 'SET_TOTAL_PRICE', payload: data.totalPrice });
        } else {
          dispatch({ type: 'SET_CART', payload: [] });
          dispatch({ type: 'SET_TOTAL_PRICE', payload: 0 });
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart data:', error.message);
        if (error.response && error.response.status === 401) {
          setError('Unauthorized access - please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('Error fetching cart data');
        }
        setLoading(false);
      }
    };

    fetchCart();
  }, [dispatch, navigate]);

  const handleQuantityChange = async (productId, action, size) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/update-cart`, {
        productId,
        action,
        size: size || null
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({ type: 'SET_CART', payload: response.data.cart });
      dispatch({ type: 'SET_TOTAL_PRICE', payload: response.data.totalPrice });
    } catch (error) {
      console.error('Error updating cart:', error.message);
      if (error.response && error.response.status === 401) {
        setError('Unauthorized access - please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError('Error updating cart');
      }
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleCheckout = () => {
    setShowAddressPopup(true);
  };

  
const handleAddressSubmit = async () => {
  if (!address.street || !address.city || !address.state || !address.pincode || !address.landmark) {
      alert('Please enter all address details.');
      return;
  }
  
  setShowAddressPopup(false);

  try {
      const token = localStorage.getItem('token');
      if (!token) {
          throw new Error('User not authenticated');
      }

      await axios.post(`${process.env.REACT_APP_API_URL}/add-address`, address, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });

      const orderResponse = await axios.post(`${process.env.REACT_APP_API_URL}/payment/create-order`, {
          amount: state.totalPrice * 100, // amount in paise
          currency: 'INR',
          receipt: 'order_rcptid_11'
      }, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });

      const { id: orderId, amount, currency } = orderResponse.data;

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
          throw new Error('Razorpay SDK failed to load. Are you online?');
      }

      const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount,
          currency,
          name: 'TRUE HOOD',
          description: 'Transaction',
          order_id: orderId,
          handler: async function (response) {
              try {
                  await axios.post(`${process.env.REACT_APP_API_URL}/payment/verify-payment`, {
                      razorpay_order_id: orderId,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature
                  }, {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  });

                  dispatch({ type: 'CLEAR_CART' });
                  navigate('/dashboard');
              } catch (error) {
                  console.error('Error verifying payment:', error.message);
                  setError('Payment verification failed');
              }
          },
          prefill: {
              name: 'Arjit Avadhanam',
              email: 'avadhanamarjit15@gmail.com',
              contact: '9618825172'
          },
          theme: {
              color: '#3399cc'
          }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
  } catch (error) {
      console.error('Error during checkout:', error.message);
      if (error.response && error.response.status === 401) {
          setError('Unauthorized access - please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
      } else {
          setError('Error during checkout: ' + error.message);
      }
  }
};

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (state.cartItems.length === 0) {
    return (
      <>
        <h3 style={{ textAlign: 'center' }}></h3>
        <div className='no-orders'>
          <p>Oops, you don't have anything in your cart! 😞</p>
        </div>
      </>
    );
  }
  

  return (
    <>
      <section id='part-1'>
        <div className='black-box'>
          <p>Free Shipping available worldwide!</p>
        </div>
        <div className='navbar barrr'>
          <p className='jalsa'>TRUE HOOD</p>
        </div>
      </section>

      <div className="black-border"></div>
      <div className='shopping-cart'>
        <h3>SHOPPING CART</h3>
      </div>
      {state.cartItems.map((item) => (
        <div key={item._id} className="cart-class1">
          <img src={imageMapping[item.productId]} alt={`Product ${item.productId}`} />
          <div className="flex-col calvin1">
            <h3>{item.name}</h3>
            {item.size && <p className='p-size'>Size: {item.size}</p>}
            <p className="quantity calvin1">Quantity: {item.quantity}</p>
            <h3 className="itemprice">₹{item.price * item.quantity}.00</h3> {/* Correctly calculate the total price for the item */}
            <div className="quantity-buttons">
              <button className="quantity-button" onClick={() => handleQuantityChange(item.productId, 'decrease', item.size)}>-</button>
              <button className="quantity-button" onClick={() => handleQuantityChange(item.productId, 'increase', item.size)}>+</button>
            </div>
          </div>
          <div className="border-45"></div>
        </div>
      ))}

      <div className="cart-class2">
        <div className="inside">
          <h2>ORDER SUMMARY</h2>
          <h4><span>SUB TOTAL:</span> INR {state.totalPrice}</h4>
          <h4><span>DELIVERY CHARGES:</span> FREE</h4>
          <h4><span>TOTAL:</span> INR {state.totalPrice}</h4>
          <button onClick={handleCheckout} className="checkout-btn last-button">
            CHECKOUT
          </button>
        </div>
      </div>

      {showAddressPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowAddressPopup(false)}>&times;</span>
            <h2>Enter Your Address</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddressSubmit(); }}>
              <label>
                Street:<br />
                <input type="text" name="street" value={address.street} onChange={handleAddressChange} required />
              </label>
              <label>
                City:<br />
                <input type="text" name="city" value={address.city} onChange={handleAddressChange} required />
              </label>
              <label>
                State:<br />
                <input type="text" name="state" value={address.state} onChange={handleAddressChange} required />
              </label>
              <label>
                Landmark:
                <input type="text" name="landmark" value={address.landmark} onChange={handleAddressChange} />
              </label>
              <label>
                Pincode:<br />
                <input type="text" name="pincode" value={address.pincode} onChange={handleAddressChange} required />
              </label>
              <button type="submit">Submit Address</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDetail;
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import "../App.css";

// const CartDetail = () => {
//   const [user, setUser] = useState(null);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const { id } = useParams();

//   useEffect(() => {
//     const doCart = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/get-cart/${id}`);
//         const data = response.data;
//         setUser(data.cart);
//         setTotalPrice(data.totalPrice);
//         console.log("Cart data fetched", data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     doCart();
//   }, [id]);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   if (user && Array.isArray(user)) {
//     return (
//       <>
//         <h1 className='heading-sale cart-head'>SHOPPING CART</h1>
//         <div className='black-border'></div>

//         {user.map((item) => (
//           <div key={item._id} className='cart-class1'>
//             <img src={`/images/pro${item.productId}.webp`} alt={`Product ${item.productId}`} />
//            <div className='flex-col calvin1'> 
//             <h3>{item.name}</h3>
//             <p className='quantity'>Quantity: {item.quantity}</p>
//             {/* <p>Price per item: {item.price / item.quantity}</p> */}
//             <h3 className='itemprice'>INR {item.price}</h3>
            
//             <div className='border-45'></div>
//             </div>
            
//           </div>
          
//         ))}
//         <div className='cart-class2'>
//          <div className='inside'>
//           <h2>ORDER SUMMARY</h2>
//           <h4><span>SUB TOTAL:</span> INR {totalPrice}</h4>
//           <h4><span>TAX AND DELIVERY CHARGES:</span> INR {100}</h4>
//           <h4><span>TOTAL:</span> INR {totalPrice+100}</h4>
//           <button className='last-button'>CHECKOUT</button>
//         </div>
//         </div>
        
//       </>
//     );
//   }

//   return (
//     <>
//       <h3 style={{ textAlign: "center" }}>Oops, you don't have anything in your cart! 😞</h3>
//     </>
//   );
// };

// export default CartDetail;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import "../App.css";

// const CartDetail = () => {
//   const [user, setUser] = useState(null);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const { id } = useParams();

//   // Define endpoint URLs
//   const endpointUrls = {
//     getCart: `http://localhost:3001/get-cart/${id}`,
//     getAnotherData: `https://arjit-fashion.vercel.app/get-cart/${id}`,
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(endpointUrls.getCart);
//         const data = response.data;
//         setUser(data.cart);
//         setTotalPrice(data.totalPrice);
//         console.log("Cart data fetched", data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [id, endpointUrls.getCart]);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   if (user && Array.isArray(user)) {
//     return (
//       <>
//         <h1>INDIVIDUAL ITEMS</h1>
//         {user.map((item) => (
//           <div key={item._id}>
//             <img src={`/images/pro${item.productId}.webp`} alt={`Product ${item.productId}`} />
//             <p>No of items: {item.quantity}</p>
//             <p>Price per item: {item.price / item.quantity}</p>
//             <h3>Total for this item: {item.price}</h3>
//           </div>
//         ))}
//         <h2>Total Bill: {totalPrice}</h2>
//       </>
//     );
//   }

//   return (
//     <>
//       <h3 style={{ textAlign: "center" }}>Oops, you don't have anything in your cart! 😞</h3>
//     </>
//   );
// };

// export default CartDetail;
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import "../App.css";

// const CartDetail = () => {
//   const [user, setUser] = useState(null);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const { id } = useParams();

//   // Define endpoint URLs
//   const endpointUrls = {
//     getCart: `http://localhost:3001/get-cart/${id}`,
//     getAnotherData: `https://arjit-fashion.vercel.app/get-cart/${id}`,
//     // Add more endpoint URLs as needed
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(endpointUrls.getCart);
//         const data = response.data;
//         setUser(data.cart);
//         setTotalPrice(data.totalPrice);
//         console.log("Cart data fetched", data);
//       } catch (error) {
//         console.error('Failed to fetch cart data', error);
//         if (error.response) {
//           // Server responded with a status other than 2xx
//           console.error('Error data:', error.response.data);
//           console.error('Error status:', error.response.status);
//           console.error('Error headers:', error.response.headers);
//         } else if (error.request) {
//           // Request was made but no response was received
//           console.error('Error request:', error.request);
//         } else {
//           // Something happened in setting up the request
//           console.error('Error message:', error.message);
//         }
//       }
//     };

//     fetchData();
//   }, [id, endpointUrls.getCart]);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   if (user && Array.isArray(user)) {
//     return (
//       <>
//         <h1>INDIVIDUAL ITEMS</h1>
//         {user.map((item) => (
//           <div key={item._id}>
//             <img src={`/images/pro${item.productId}.webp`} alt={`Product ${item.productId}`} />
//             <p>No of items: {item.quantity}</p>
//             <p>Price per item: {(item.price / item.quantity).toFixed(2)}</p>
//             <h3>Total for this item: {item.price}</h3>
//           </div>
//         ))}
//         <h2>Total Bill: {totalPrice}</h2>
//       </>
//     );
//   }

//   return (
//     <>
//       <h3 style={{ textAlign: "center" }}>Oops, you don't have anything in your cart! 😞</h3>
//     </>
//   );
// };

// export default CartDetail;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const CartDetail = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state, dispatch } = useCart();

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

        const data = response.data.cart[0]; // Assuming only one cart per user
        dispatch({ type: 'SET_CART', payload: data.items });
        dispatch({ type: 'SET_TOTAL_PRICE', payload: data.totalPrice });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart data:', error.message);
        setError('Error fetching cart data');
        setLoading(false);
      }
    };

    fetchCart();
  }, [dispatch]);

  const handleQuantityChange = async (productId, action, size) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.post('http://localhost:3001/update-cart', {
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
    }
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('User not authenticated');
      }

      await axios.post('http://localhost:3001/checkout', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({ type: 'CLEAR_CART' });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during checkout:', error.message);
      setError('Error during checkout: ' + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!state.cartItems || state.cartItems.length === 0) {
    return (
      <h3 style={{ textAlign: 'center' }}>Oops, you don't have anything in your cart! 😞</h3>
    );
  }

  return (
    <>
      <h1 className="heading-sale cart-head">SHOPPING CART</h1>
      <div className="black-border"></div>

      {state.cartItems.map((item) => (
        <div key={item._id} className="cart-class1">
          <img src={`/images/pro${item.productId}.webp`} alt={`Product ${item.productId}`} />
          <div className="flex-col calvin1">
            <h3>{item.name}</h3>
            {item.size && <p>Size: {item.size}</p>}
            <p className="quantity calvin1">Quantity: {item.quantity}</p>
            <h3 className="itemprice">INR {item.price * item.quantity}</h3> {/* Correctly calculate the total price for the item */}
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
          <h4><span>TAX AND DELIVERY CHARGES:</span> INR {100}</h4>
          <h4><span>TOTAL:</span> INR {state.totalPrice + 100}</h4>
          <button className="last-button" onClick={handleCheckout}>CHECKOUT</button>
        </div>
      </div>
    </>
  );
};

export default CartDetail;

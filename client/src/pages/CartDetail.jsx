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
import "../App.css";

const CartDetail = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        setCart(data.cart || []);
        setTotalPrice(data.totalPrice || 0);
        setLoading(false);
        console.log("Cart data fetched", data);
      } catch (error) {
        console.error("Error fetching cart data", error);
        setError('Error fetching cart data');
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, action, size) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.post('http://localhost:3001/update-cart', {
        productId,
        action,
        size: size || null  // Ensure size is sent as null if not applicable
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Update cart response:', response.data);

      const updatedCart = response.data.cart || [];
      setCart(updatedCart);
      setTotalPrice(response.data.totalPrice || 0);
      console.log('Cart updated:', updatedCart);
    } catch (error) {
      console.error('Error updating cart:', error.message);
      setError('Error updating cart: ' + error.message);
      // Handle error (e.g., show error message to user)
    }
  };

  useEffect(() => {
    console.log('Cart or TotalPrice changed:', cart, totalPrice);
  }, [cart, totalPrice]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!cart || cart.length === 0) {
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

      {cart.map((item) => (
        <div key={item._id} className='cart-class1'>
          <img src={`/images/pro${item.productId}.webp`} alt={`Product ${item.productId}`} />
          <div className='flex-col calvin1'>
            <h3>{item.name}</h3>
            {item.category !== 'Accessories' && (
              <p>Size: {item.size}</p>
            )}
            <p className='quantity calvin1'>Quantity: {item.quantity}</p>
            {item.category === 'T-Shirts' && (
              <select
                value={item.size || ''}
                onChange={(e) => handleQuantityChange(item.productId, 'update', e.target.value)}
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            )}
            <h3 className='itemprice'>INR {item.price}</h3>
            <div className='quantity-buttons'>
              <button className='quantity-button' onClick={() => handleQuantityChange(item.productId, 'decrease', item.size)}>-</button>
              <button className='quantity-button' onClick={() => handleQuantityChange(item.productId, 'increase', item.size)}>+</button>
            </div>
          </div>
          <div className='border-45'></div>
        </div>
      ))}

      <div className='cart-class2'>
        <div className='inside'>
          <h2>ORDER SUMMARY</h2>
          <h4><span>SUB TOTAL:</span> INR {totalPrice}</h4>
          <h4><span>TAX AND DELIVERY CHARGES:</span> INR {100}</h4>
          <h4><span>TOTAL:</span> INR {totalPrice + 100}</h4>
          <button className='last-button'>CHECKOUT</button>
        </div>
      </div>
    </>
  );
};

export default CartDetail;

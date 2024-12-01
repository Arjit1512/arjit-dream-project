// import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import '../App.css';

// const CartPage = () => {
//     const location = useLocation();
//     const { state } = location;
//     const [userId, setUserId] = useState(null);
//     const [userCart, setUserCart] = useState([]);
//     const cartItems = state?.cartItems || [];

//     const handleImageClick = async (index, event) => {
//         event.preventDefault();
//         console.log('Clicked index:', index);

//         try {
//             // Ensure userId is set before making the request
//             if (!userId) {
//                 console.error('userId is null or undefined');
//                 return;
//             }

//             const response = await axios.post(`http://localhost:3001/add-to-cart/${userId}`, {
//                 productId: index + 1,
//                 quantity: 1,
//             });

//             console.log('Response:', response.data);
//             fetchUserCart();
//         } catch (error) {
//             console.error('Error adding item to cart:', error);
//         }
//     };

//     useEffect(() => {
//         // Set userId from state or any other source
//         setUserId(state?.userId || null);
//         // Fetch user's cart when the component mounts
//         fetchUserCart();
//     }, [state?.userId]); // Add state?.userId as a dependency

//     const fetchUserCart = async () => {
//         try {
//             // Ensure userId is set before making the request
//             if (!userId) {
//                 console.error('userId is null or undefined');
//                 return;
//             }

//             const response = await axios.get(`http://localhost:3001/get-cart/${userId}`);
//             console.log('User Cart:', response.data.cart);
//             setUserCart(response.data.cart);
//         } catch (error) {
//             console.error('Error fetching user cart:', error);
//             // Handle error or show an error message to the user
//         }
//     };


//     return (
//         <div className="cart-page-main">

//             {/* <div className="cart-items sale1">
//                 {cartItems.map((item, index) => (
//                     <div
//                         key={index}
//                         className="cart-item flex-row sale1"
//                         onClick={(event) => handleImageClick(index, event)}
//                     >
//                         <img src={`../sources/pro${index + 1}.webp`} alt={`Product ${index + 1}`} />
//                         <div className="flex-col comp-of-items">
//                             <h2>Interior & Exterior<br />
//                                 Painting</h2>
//                             <p>Set the mood with a fresh coat of paint.</p>
//                             <h3>899.00</h3>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {selectedItem && (
//                 <div>
//                     <h2>Selected Item</h2>
//                     <img src={selectedItem} alt="Selected Product" />
//                 </div>
//             )} */}

//             <div>
//                 <h2>User Cart</h2>
//                 <ul>
//                     {userCart.map((item, index) => (
//                         <li key={index}>
//                             Product ID: {item.productId}, Quantity: {item.quantity}
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//         </div>
//     );


// }
// export default CartPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const CartPage = () => {

//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         const handleCart = async () => {

//             try {
//                 const response = await axios.get(`http://localhost:3001/get-cart`,`https://arjit-fashion.vercel.app/get-cart`,);
//                 setUsers(response.data);
//                 console.log("data has been come to frontend", response.data);
//             }
//             catch (error) {
//                 console.log("Error adding to cart", error);
//             }

//         }
//         handleCart();
//     }, []);


//     return (
//         <>
//             <h1>ENTIRE ITEMS</h1>
//             {Array.isArray(users.data) ? (
//                 users.data.map((user) => (
//                     <h4 key={user._id}>The below cart of {user.userName}'s consists of {user.cart} <br/></h4>
//                 ))
//             ) : (
//                 <p>No items in the cart.</p>
//             )}
//         </>
//     );

// }

// export default CartPage;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const CartPage = () => {
//     const [users, setUsers] = useState([]);
//     const { id } = useParams(); // Assuming you might need user ID for fetching cart data

//     // Define endpoint URLs
//     const endpointUrls = [
//         `http://localhost:3001/get-cart`,
//         `https://arjit-fashion.vercel.app/get-cart`,
//     ];

//     useEffect(() => {
//         const handleCart = async () => {
//             try {
//                 const responses = await Promise.all(
//                     endpointUrls.map((url) => axios.get(url))
//                 );

//                 // Assuming that all responses have the same structure and you want to merge them
//                 const allUsers = responses.flatMap((response) => response.data);
//                 setUsers(allUsers);
//                 console.log("Data has been fetched", allUsers);
//             } catch (error) {
//                 console.log("Error fetching cart data", error);
//             }
//         };

//         handleCart();
//     }, []);

//     return (
//         <>
//             <h1>ENTIRE ITEMS</h1>
//             {Array.isArray(users) && users.length > 0 ? (
//                 users.map((user) => (
//                     <h4 key={user._id}>
//                         The below cart of {user.userName} consists of {user.cart}
//                         <br />
//                     </h4>
//                 ))
//             ) : (
//                 <p>No items in the cart.</p>
//             )}
//         </>
//     );
// };

// export default CartPage;

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const CartPage = () => {
  const location = useLocation();
  const { state } = location;
  const [userCart, setUserCart] = useState([]);
  const cartItems = state?.cartItems || [];

  const handleImageClick = async (index, event) => {
    event.preventDefault();
    console.log('Clicked index:', index);

    try {
      const token = localStorage.getItem('token'); 

      if (!token) {
        console.error('No token found. User is not authenticated.');
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/add-to-cart`, {
        productId: index + 1,
        quantity: 1,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Response:', response.data);
      fetchUserCart();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

  const fetchUserCart = async () => {
    try {
      const token = localStorage.getItem('token'); 

      if (!token) {
        console.error('No token found. User is not authenticated.');
        return;
      }

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-cart`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('User Cart:', response.data.cart);
      setUserCart(response.data.cart);
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  };

  return (
    <div className="cart-page-main">
      <div>
        <h2>User Cart</h2>
        <ul>
          {userCart.map((item, index) => (
            <li key={index}>
              Product ID: {item.productId}, Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartPage;

// // import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router-dom';
// // import axios from 'axios';
// // import "../App.css";

// // const CartDetail = () => {
// //   const [user, setUser] = useState(null);
// //   const [totalPrice, setTotalPrice] = useState(0);
// //   const { id } = useParams();

// //   useEffect(() => {
// //     const doCart = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:3001/get-cart/${id}`);
// //         const data = response.data;
// //         setUser(data.cart);
// //         setTotalPrice(data.totalPrice);
// //         console.log("Cart data fetched", data);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };

// //     doCart();
// //   }, [id]);

// //   if (!user) {
// //     return <div>Loading...</div>;
// //   }

// //   if (user && Array.isArray(user)) {
// //     return (
// //       <>
// //         <h1>INDIVIDUAL ITEMS</h1>
// //         {user.map((item) => (
// //           <div key={item._id}>
// //             <img src={`/images/pro${item.productId}.webp`} alt={`Product ${item.productId}`} />
// //             <p>No of items: {item.quantity}</p>
// //             <p>Price per item: {item.price / item.quantity}</p>
// //             <h3>Total for this item: {item.price}</h3>
// //           </div>
// //         ))}
// //         <h2>Total Bill: {totalPrice}</h2>
// //       </>
// //     );
// //   }

// //   return (
// //     <>
// //       <h3 style={{ textAlign: "center" }}>Oops, you don't have anything in your cart! 😞</h3>
// //     </>
// //   );
// // };

// // export default CartDetail;
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
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../App.css";

const CartDetail = () => {
  const [user, setUser] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();

  // Define endpoint URLs
  const endpointUrls = {
    getCart: `http://localhost:3001/get-cart/${id}`,
    getAnotherData: `https://arjit-fashion.vercel.app/get-cart/${id}`,
    // Add more endpoint URLs as needed
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpointUrls.getCart);
        const data = response.data;
        setUser(data.cart);
        setTotalPrice(data.totalPrice);
        console.log("Cart data fetched", data);
      } catch (error) {
        console.error('Failed to fetch cart data', error);
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error('Error data:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
        } else if (error.request) {
          // Request was made but no response was received
          console.error('Error request:', error.request);
        } else {
          // Something happened in setting up the request
          console.error('Error message:', error.message);
        }
      }
    };

    fetchData();
  }, [id, endpointUrls.getCart]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (user && Array.isArray(user)) {
    return (
      <>
        <h1>INDIVIDUAL ITEMS</h1>
        {user.map((item) => (
          <div key={item._id}>
            <img src={`/images/pro${item.productId}.webp`} alt={`Product ${item.productId}`} />
            <p>No of items: {item.quantity}</p>
            <p>Price per item: {(item.price / item.quantity).toFixed(2)}</p>
            <h3>Total for this item: {item.price}</h3>
          </div>
        ))}
        <h2>Total Bill: {totalPrice}</h2>
      </>
    );
  }

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Oops, you don't have anything in your cart! 😞</h3>
    </>
  );
};

export default CartDetail;

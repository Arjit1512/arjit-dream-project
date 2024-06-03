import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../App.css";

const CartDetail = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const doCart = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/get-cart/${id}`,`https://arjit-fashion.vercel.app/get-cart/${id}`, );
        const data = response.data;
        setUser(data);
        console.log("Cart data fetched", data);
      } catch (error) {
        console.error(error);
      }
    };

    doCart();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (user.cart && Array.isArray(user.cart)) {
    return (
      <>
        <h1>INDIVIDUAL ITEMS</h1>
        {user.cart.map((item) => (
          <div key={item._id}>
            {/* <p>Product ID: {item.productId}</p> */}
            <img src={`/images/pro${item.productId}.webp`} alt={`Product ${item.productId}`} />
            <p>No of items: {item.quantity}</p>
            <h3>The total bill that you need to pay:{item.price}</h3>
          </div>
        ))}
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

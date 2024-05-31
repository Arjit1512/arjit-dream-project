import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../App.css";

const CartDetail = () => {
  const [user, setUser] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const doCart = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/get-cart/${id}`);
        const data = response.data;
        setUser(data.cart);
        setTotalPrice(data.totalPrice);
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

  if (user && Array.isArray(user)) {
    return (
      <>
        <h1>INDIVIDUAL ITEMS</h1>
        {user.map((item) => (
          <div key={item._id}>
            <img src={`/images/pro${item.productId}.webp`} alt={`Product ${item.productId}`} />
            <p>No of items: {item.quantity}</p>
            <p>Price per item: {item.price / item.quantity}</p>
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

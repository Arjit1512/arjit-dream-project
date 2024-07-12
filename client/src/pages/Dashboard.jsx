import React, { useContext } from 'react';
import { useCart } from './CartContext';

const Dashboard = () => {
  const { state } = useCart();

  return (
    <div>
      <h1>MY ORDERS</h1>
      {state.cartItems.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Size: {item.size}</p>
          <p>Price: INR {item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

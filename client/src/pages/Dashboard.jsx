import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      console.log("Fetching user data with token:", token);
      try {
        const response = await axios.get('http://localhost:3001/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("User data fetched:", response.data.user);
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div>
      <h3>Thank you, {user.userName} for being part of our hood.</h3>
      <h2>Total Orders:</h2>
      <ul>
        {user.totalOrders.map(order => (
          <li key={order._id}>
            <h3>Order Date: {new Date(order.orderDate).toLocaleString()}</h3>
            <p>Total Bill: ${order.totalBill}</p>
            <h4>Items:</h4>
            <ul>
              {order.items.map(item => (
                <li key={item._id}>
                  {item.name} (Quantity: {item.quantity}) - ${item.price} each
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

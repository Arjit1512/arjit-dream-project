import React, { useEffect, useState } from 'react';
import axios from 'axios';
import i1 from "../sources/i1.jpg";
import i3 from "../sources/i3.jpg";
import i5 from "../sources/i5.jpg";
import i7 from "../sources/i7.png";
import i9 from "../sources/pro9.jpg";
import i10 from "../sources/pro10.jpg";
import i11 from "../sources/i11.png";
import i13 from "../sources/i13.png";
import i15 from "../sources/i15.png";
import i17 from "../sources/i17.png";
import ending from '../sources/ending.jpg';
import love from "../sources/love.jpg";
import '../App.css';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const images = {
  1: i1,
  3: i3,
  5: i5,
  7: i7,
  9: i9,
  10: i10,
  11: i11,
  13: i13,
  15: i15,
  17: i17
};

const getImageSrc = (productId) => {
  return images[productId] || ending; // Default to 'ending' image if no match is found
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      console.log("Fetching user data with token:", token);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard`, {
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

  // Sort orders by latest date
  const sortedOrders = user.totalOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

  return (
    <>
      <section id='part-1'>
        {/* <div className='black-box'>
          <p>Free Shipping available worldwide!</p>
        </div> */}
        <div className='navbar' style={{backgroundColor:"black"}}>
          <div className='t-h'>
          <p className='title-hood'>TRUE HOOD</p>
          </div>
        </div>
      </section>
  
      <div className='dash-order'>
        {sortedOrders.length > 0 ? (
          <>
            <img className='dragon-img' src={`/images/snake.png`} alt="Dragon" />
            <h3 className='grateful'>Thank you, {user.userName}, for being part of our hood.</h3>
            <ul>
               <h2>Your Orders</h2>
              {sortedOrders.map(order => (
                <li key={order._id}>
                  <h3 className='date'>Ordered by you on <span>{new Date(order.orderDate).toLocaleString()}</span></h3>
                  {order.items.map(item => (
                    <div className='flex-row order-box' key={item._id}>
                      <img className='order-img' src={getImageSrc(item.productId)} alt={item.name} />
                      <div className='flex-col inner-box'>
                        <h4>{item.name}</h4>
                        <p>Quantity: {item.quantity}</p>
                        {item.category !== 'Accessories' && item.size && <p>Size: {item.size}</p>}
                        <p>₹{item.price * item.quantity}.00</p>
                      </div>
                    </div>
                  ))}
                  <p className='bill'>Total Bill Paid: <span>₹{order.totalBill}.00</span></p>
                </li>
              ))}
            </ul>
            <div className='black-div'>
              <h2>WE WOULD LOVE TO SEE YOU AGAIN!</h2>
              <img className='love' src={love} alt='Love' />
            </div>
          </>
        ) : (
          <div className='no-orders'>
            <p>Sorry, you haven't ordered anything yet.</p>
            <Link className='s-box' to={"/"}>GO TO HOME</Link>
          </div>
        )}
      </div>
    </>
  );
  
};

export default Dashboard;

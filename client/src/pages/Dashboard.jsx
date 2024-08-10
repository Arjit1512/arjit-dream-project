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
  return images[productId] || ending;
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastProcessedOrderId, setLastProcessedOrderId] = useState(null);
  const [processedOrders, setProcessedOrders] = useState(new Set());
  const [creatingOrder, setCreatingOrder] = useState(false);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const generateShiprocketToken = async () => {
    try {
      const response = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: "hemanth.a21@iiits.in",
          password: "Hemanth#2003"
        })
      });
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Error generating Shiprocket token:', error);
      throw error;
    }
  };

  const createShiprocketOrder = async (order) => {
    try {
      setCreatingOrder(true);
      const shiprocketToken = await generateShiprocketToken();
      const orderDetails = {
        order_id: `order_${Date.now()}`,
        order_date: new Date().toISOString(),
        pickup_location: "Primary",
        comment: "Customer Order",
        billing_customer_name: user.userName || "Not Provided",
        billing_address: user.address[user.address.length - 1]?.street || "Not Provided",
        billing_city: user.address[user.address.length - 1]?.city || "Not Provided",
        billing_pincode: Number(user.address[user.address.length - 1]?.pincode) || 517646,
        billing_state: user.address[user.address.length - 1]?.state || "Not Provided",
        billing_country: "India",
        billing_last_name: "",
        billing_email: user.email || "Not Provided@gmail.com",
        billing_phone: user.phone || "9618825172",
        shipping_is_billing: true,
        shipping_customer_name: user.userName || "Not Provided",
        shipping_address: user.address[user.address.length - 1]?.street || "Not Provided",
        shipping_city: user.address[user.address.length - 1]?.city || "Not Provided",
        shipping_pincode: Number(user.address[user.address.length - 1]?.pincode) || 517646,
        shipping_country: "India",
        shipping_state: user.address[user.address.length - 1]?.state || "Not Provided",
        shipping_email: user.email || "Not Provided@gmail.com",
        shipping_phone: user.phone || "9618825172",
        order_items: order.items.map(item => ({
          name: item.name || "Item Name not provided",
          sku: "SKU" + item.productId.toString(),
          units: item.quantity || 1,
          selling_price: Number(item.price) || 0,
          discount: item.discount || 0,
          tax: item.tax || 0,
          hsn: item.hsn || 123456
        })),
        payment_method: "UPI",
        shipping_charges: 0,
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: 0,
        sub_total: Number(order.totalBill) || 0,
        length: 10,
        breadth: 15,
        height: 20,
        weight: 1.5
      };

      const response = await fetch('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${shiprocketToken}`
        },
        body: JSON.stringify(orderDetails)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Shiprocket order creation failed: ${data.message || 'Unknown error'}`);
      }
      console.log('Shiprocket order created successfully:', data);
      setProcessedOrders(prev => new Set(prev.add(order._id)));
    } catch (error) {
      console.error('Error creating Shiprocket order:', error);
    } finally {
      setCreatingOrder(false);
    }
  };

  useEffect(() => {
    if (user && user.totalOrders.length > 0 && !creatingOrder) {
      const latestOrder = user.totalOrders[0];
      if (!processedOrders.has(latestOrder._id)) {
        console.log('New order detected, creating Shiprocket order');
        createShiprocketOrder(latestOrder);
      } else {
        console.log('No new orders to process');
      }
    }
  }, [user, processedOrders, creatingOrder]);



  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const toIST = (dateString) => {
    const date = new Date(dateString);
    const options = { timeZone: 'Asia/Kolkata', timeZoneName: 'short' };
    return date.toLocaleString('en-IN', options);
  };

  if (loading) {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    );
}

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  const sortedOrders = user.totalOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

  return (
    <>
      <section id='part-1'>
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
                  <h3 className='date'>Ordered by you on <span>{toIST(order.orderDate)}</span></h3>
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


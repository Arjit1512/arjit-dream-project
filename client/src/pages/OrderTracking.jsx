import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderTracking = ({ orderId, trackingInfo }) => {
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (trackingInfo) {
      setOrderStatus(trackingInfo);
    }
  }, [trackingInfo]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {orderStatus ? (
        <div>
          <h2>Order Tracking Details</h2>
          <p>Order ID: {orderStatus.order_id}</p>
          <p>Status: {orderStatus.status}</p>
          <p>Status Code: {orderStatus.status_code}</p>
          <p>AWB Code: {orderStatus.awb_code}</p>
        </div>
      ) : (
        <p>Loading order tracking details...</p>
      )}
    </div>
  );
};

export default OrderTracking;

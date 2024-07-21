import React from 'react';
import './Returns.css';

const Returns = () => {
  return (
    <div className="returns-container">
      <h1 className="returns-title">Returns and Refund Policy</h1>
      
      <section className="policy-section">
        <h2>Cancellation & Refund Request Time</h2>
        <p>
          We accept cancellation and refund requests only on the same day the order is placed. Please contact customer support on the same day to process your request.
        </p>
      </section>

      <section className="policy-section">
        <h2>Refund Processing Time</h2>
        <p>
          All refunds will be processed within 5-7 business days after the cancellation request is approved. Confirmation emails will be sent once the refund is processed.
        </p>
      </section>

      <section className="policy-section">
        <h2>Shipping Time</h2>
        <p>
          Our shipping times vary from 8 to 14 days, depending on your location and product availability. Tracking numbers will be provided once your order is shipped.
        </p>
      </section>
    </div>
  );
}

export default Returns;

import React from 'react';
import './Returns.css';

const Returns = () => {
  return (
    <div className="returns-container">
      <h1 className="returns-title">Returns and Refund Policy</h1>
      
      <section className="policy-section">
        <h2>Cancellation & Refund Request Time</h2>
        <p>
          We accept cancellation and refund requests only on the same day the order is placed. Please contact customer support on the same day to process your request.<br/>
          NOTE: <b>We are not accepting CODs for now.</b>
        </p>
      </section>

      <section className="policy-section">
        <h2>Shipping Policy</h2>
        <p>
        We do not guarantee that delivery will always be the fastest.<br />
          Minimum Shipping Time - 2 days<br/>
          Average Shipping Time - 8 days<br/>
          Maximum Shipping Time - 21 days(approx. 3 weeks)
        </p>
      </section>

      <section className="policy-section">
        <h2>Exchange Policy</h2>
        <p>
         If you want to exchange your product, the request should be sent via email(you get a reply within 2 days) or by whatsApp within the duration of 3 days after the order has been delivered. After 3 days, the request will not be considered.
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
          Our average shipping times vary from 8 to 14 days, depending on your location and product availability. Tracking numbers will be provided once your order is shipped.
        </p>
      </section>
    </div>
  );
}

export default Returns;

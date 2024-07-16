import React from 'react';
import './CustomerCare.css'; // Import CSS file for styling

const CustomerCare = () => {
    return (
        <div className="customer-care-container">
            <h1>Customer Care</h1>
            <p>
                Welcome to our Customer Care page! At Arjit Avadhanam, we are committed to providing you with the best possible shopping experience. Here's how we can assist you:
            </p>
            <section className="customer-care-section">
                <h2>Contact Us</h2>
                <p>
                    If you have any questions, concerns, or feedback, our customer care team is here to help. You can reach us via:
                </p>
                <ul>
                    <li>Phone: +91 9618825172</li>
                    <li>Email: avadhanamarjit15@gmail.com</li>
                    <li>Live Chat: https://www.instagram.com/hood.clothing.in</li>
                </ul>
            </section>
            <section className="customer-care-section">
                <h2>FAQs</h2>
                <p>
                    Before reaching out, you may find answers to common questions in our FAQs section. Here are some frequently asked questions:
                </p>
                <ul>
                    <li>How do I track my order?</li>
                    <li>What is your return policy?</li>
                    <li>How do I update my account information?</li>
                </ul>
                <p>
                    Visit our <a href="/faq">FAQ page</a> for more information.
                </p>
            </section>
            <section className="customer-care-section">
                <h2>Return Policy</h2>
                <p>
                    We want you to be completely satisfied with your purchase. Our return policy allows you to return items within [insert number] days of purchase for a full refund or exchange.
                </p>
                <p>
                    For more details, please review our <a href="/returns">Return Policy</a>.
                </p>
            </section>
            <section className="customer-care-section">
                <h2>Privacy & Security</h2>
                <p>
                    Your privacy and security are important to us. Learn how we protect your information and ensure secure transactions.
                </p>
                <p>
                    Read our <a href="/privacy-policy">Privacy Policy</a> for more information.
                </p>
            </section>
            <section className="customer-care-section">
                <h2>Feedback</h2>
                <p>
                    We value your feedback! Help us improve by sharing your thoughts and suggestions.
                </p>
                <p>
                    Submit your feedback through our <a href="/community">Feedback Form</a>.
                </p>
            </section>
        </div>
    );
}

export default CustomerCare;

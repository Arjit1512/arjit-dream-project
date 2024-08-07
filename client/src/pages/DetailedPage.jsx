import React, { useState } from 'react';
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faPinterest, faTwitter, faYoutube, faShopify, faShoppingCart } from "@fortawesome/free-brands-svg-icons";
import { faShoppingCart as faCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from 'react-router-dom';
import i1 from "../sources/i1.jpg";
import i2 from "../sources/i2.jpg";
import i3 from "../sources/i3.jpg";
import { useCart } from './CartContext.js';

const DetailedPage = () => {
    const navigate = useNavigate();
    const { state, addToCart } = useCart();

    const [showNotification, setShowNotification] = useState(false);

    const handleAddToCart = (index) => {
        const selectedImage = `../sources/i${index + 1}.jpg`;
        addToCart(selectedImage);
    
        setShowNotification(true);
    
        setTimeout(() => {
            setShowNotification(false);
        }, 2000);
    };
    
     
    return (
        <>

            <section id='part-1'>
                <div className='black-box'>
                    <p>Free Shipping available worldwide!</p>
                </div>
                <div className='navbar'>
                    <p>ARJIT AVADHANAM</p>

                    <div className='social-icons'>
                        <FontAwesomeIcon className="fa-icon" icon={faInstagram} style={{ visibility: "hidden" }} />
                        <FontAwesomeIcon className="fa-icon" icon={faFacebook} style={{ visibility: "hidden" }} />
                        <FontAwesomeIcon className="fa-icon" icon={faTwitter} style={{ visibility: "hidden" }} />
                        <FontAwesomeIcon className="fa-icon" icon={faYoutube} style={{ visibility: "hidden" }} />
                        <FontAwesomeIcon className="fa-icon" icon={faPinterest} style={{ visibility: "hidden" }} />
                        <FontAwesomeIcon
                            className="fa-icon"
                            onClick={() => navigate("/sale")}
                            style={{ cursor: "pointer" }}
                            icon={faShopify}
                        />
                        <div
                            className="cart-icon"
                            onClick={() => navigate("/cart-page", { state: { cartItems: state.cartItems } })}
                        >
                            <FontAwesomeIcon className="fa-icon" icon={faCart} />
                            {state.cartItems.length > 0 && <span className="cart-badge">{state.cartItems.length}</span>}
                        </div>
                    </div>
                </div>

                <div className='light-border width'></div>
            </section>

            <section id="prodetails" class="section-p1">
                <div class="single-pro-image">
                    <img id="MainImg" src={i1} width="100%" alt="" />
                    {/* ... (your existing code) */}
                </div>
                <div class="single-pro-details">
                    <h1>Home / T-Shirt</h1>
                    <h4>Men's Fashion T Shirt</h4>
                    <h2>899.00</h2>
                    <select fdprocessedid="cwggv">
                        <option>Select Size</option>
                        <option>XL</option>
                        <option>XXL</option>
                        <option>Small</option>
                        <option>Large</option>
                    </select>
                    <input type="number" value="1" fdprocessedid="1mx0s" />
                    <button className="normal" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </section>


            <section id='part-2'>
                <div className='light-border width'></div>

                <h3>YOU MAY ALSO LIKE</h3>

                <div className="testimonial-section">

                    <div>
                        <div className='shop-images sale-page'>

                            <img src={i1} alt='' className='i1'></img>
                            <img src={i2} alt='' className='i2'></img>
                            <img src={i3} alt='' className='i2'></img>
                            <img src={i1} alt='' className='i3'></img>
                        </div>
                    </div>

                </div>
            </section>

            <div className='light-border width'></div>

            <section id="last">
                <div className='navigate'>
                    <h5>NAVIGATE</h5>
                    <a>Shop</a>
                    <a>About</a>
                    <a>Contact</a>
                    <a>Store locator</a>
                </div>

                <div className='get-help'>
                    <h5>GET HELP</h5>
                    <a>FAQ</a>
                    <a>Delivery</a>
                    <a>Order Process</a>
                    <a>Returns</a>
                </div>

                <div className='social'>
                    <h5>SOCIAL</h5>
                    <a>Instagram</a>
                    <a>Facebook</a>
                    <a>Tiktok</a>
                    <a>Pinterest</a>
                </div>

                <div className='customer-service'>
                    <h5>CUSTOMER SERVICE</h5>
                    <a>Privacy Policy</a>
                    <a>Terms & Conditions</a>
                    <a>Payments</a>
                    <a>Let's Act</a>
                </div>

                <div className='copy-right'>
                    <p>© Copyright 2023 Arjit Avadhanam</p>
                </div>
            </section>
        </>
    )
}

export default DetailedPage
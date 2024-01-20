import React, { useState } from 'react';
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faPinterest, faTwitter, faYoutube, faShopify, faShoppingCart } from "@fortawesome/free-brands-svg-icons";
import { faShoppingCart as faCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from 'react-router-dom';
import i1 from "../sources/i1.jpg";
import i2 from "../sources/i2.jpg";
import i3 from "../sources/i3.jpg";
import i4 from "../sources/i3.webp";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CartPage from './CartPage.jsx';
import { useHistory } from 'react-router-dom';

const DetailedPage = () => {


    const testimonialSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const [cartItems, setCartItems] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();
    
    const addToCart = () => {
        setCartItems([i2, ...cartItems]);

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
                        <FontAwesomeIcon className="fa-icon" onClick={() => navigate("/sale")} style={{cursor:"pointer"}} icon={faShopify} />
                        <div className="cart-icon"  onClick={() => navigate("/cart-page", { state: { cartItems } })}>
                            <FontAwesomeIcon className="fa-icon" icon={faCart} />
                            {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
                        </div>
                    </div>


                </div>

                <div className='light-border width'></div>
            </section>

            <section id="prodetails" class="section-p1">

                <div class="single-pro-image">
                    <img id="MainImg" src={i2} width="100%" alt="" />

                    <div class="small-img-group">
                        <div class="small-img-col">
                            <img class="small-img" src={i2} width="100%" alt="" />
                        </div>
                        <div class="small-img-col">
                            <img class="small-img" src={i2} width="100%" alt="" />
                        </div>
                        <div class="small-img-col">
                            <img class="small-img" src={i2} width="100%" alt="" />
                        </div>
                        <div class="small-img-col">
                            <img class="small-img" src={i2} width="100%" alt="" />
                        </div>
                    </div>

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
                    <button className="normal" onClick={addToCart}>Add To Cart</button>
                    
                    {showNotification && (
                        <div className="notification">
                            <p>Item added to cart</p>
                        </div>
                    )}

                    <div className='positioning'>
                        <h4>Product Details</h4>
                        <span>The Gildan Ultra Cotton T-shirt is made from a substantial 6.0 oz. per sq. yd. fabric constructed from 100% cotton, this classic fit preshrunk jersey knit provides unmatched comfort with each wear. Featuring a taped neck and shoulder, and a seamless double-needle collar, and available in a range of colors, it offers it all in the ultimate head-turning package.</span>
                    </div>
                </div>

            </section>

            <section id='part-2'>
                <div className='light-border width'></div>

                <h3>TRY OTHER PRODUCTS</h3>

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
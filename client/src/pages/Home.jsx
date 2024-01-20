import React, {useState} from 'react';
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faPinterest, faTwitter} from "@fortawesome/free-brands-svg-icons";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart as faCart } from "@fortawesome/free-solid-svg-icons";
import pixels from "../sources/pexels.mp4";
import background from "../sources/background.mp4";
import i1 from "../sources/i1.jpg";
import i2 from "../sources/i2.jpg";
import i3 from "../sources/i3.jpg";
import i4 from "../sources/i3.webp";
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';

const Home = () => {
    
    const [cartItems, setCartItems] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    
    const addToCart = () => {
        setCartItems([i1, ...cartItems]);

        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        }, 2000);


    };
    
 
    
    const navigate = useNavigate();

    function goToLogin(){
        navigate("/login");
    }
    
    
    return (
        <>
            <section id='part-1'>
                <div className='black-box'>
                    <p>Free Shipping available worldwide!</p>
                </div>
                <div className='navbar'>
                    <p>ARJIT AVADHANAM</p>

                    <div className='social-icons'>
                        <FontAwesomeIcon className="fa-icon" icon={faInstagram} />
                        <FontAwesomeIcon className="fa-icon" icon={faFacebook} />
                        <FontAwesomeIcon className="fa-icon" icon={faTwitter} />
                        <FontAwesomeIcon className="fa-icon" icon={faPinterest} />
                        <FontAwesomeIcon className="fa-icon" icon={faUser} onClick={goToLogin}/>
                        <div className="cart-icon"  onClick={() => navigate("/cart-page", { state: { cartItems } })}>
                            <FontAwesomeIcon className="fa-icon" icon={faCart} />
                            {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
                        </div>
                    </div>
                </div>

                <div className='navbar-items'>
                    <Link to='/sale' style={{textDecoration:"none" ,color:"black"}}>SALE</Link>
                    <Link to='/about-us' style={{textDecoration:"none" ,color:"black"}}>ABOUT US</Link>
                    <Link to='/community' style={{textDecoration:"none" ,color:"black"}}>COMMUNITY</Link>
                </div>
                <video autoPlay muted loop id="myVideo">
                    <source src={pixels} type="video/mp4" />
                </video>
            </section>


            <section id='part-2'>
                <h4>SHOP ONLINE</h4>


                <div className='shop-images'>
                    <img src={i1} alt='' className='i1'></img>
                    <img src={i2} alt='' className='i2'></img>
                    <img src={i3} alt='' className='i3'></img>

                </div>
            </section>


            <section id="part-3">
                <div className='p3-part1'>
                    <h3>Discover our<br />
                        latest vintage<br />
                        editions and <br />
                        more collection</h3>


                    <p>Available to purchase on our boutiques<br />
                        worldwide. Whether you choose to be a royal<br />
                        beauty in couture or to embrace your fairytale<br />
                        dream in a GALA creation, each dress is far<br />
                        beyond a product - it's a story.</p>


                    <a><i>view the collections</i></a>
                </div>
                <div className='p3-part2'>
                    <img src={i4} alt=''></img>
                </div>
            </section>

            <section id='part-4'>
                <video autoPlay muted loop id="myVideo">
                    <source src={background} type="video/mp4" />
                </video>

                <div className='text-area'>
                    <p>"Since 2013, we've garnered over 70 awards and have<br />
                        generated millions in start-up value, launching some of<br />
                        the most iconic tech brands of our era.  After realizing<br />
                        that our approach to design generates insane valuation<br />
                        metrics, we introduced a  new model - our Digital.<br />
                        Brand. Accelerator."</p>
                </div>
            </section>

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
    );
}

export default Home;

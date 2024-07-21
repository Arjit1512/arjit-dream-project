import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faPinterest, faTwitter,faShopify } from "@fortawesome/free-brands-svg-icons";
import { faShoppingCart as faCart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import bghome from '../sources/bghome.webp';
import axios from 'axios';
import "../App.css";
import UserDropdown from './UserDropdown';
import i1 from "../sources/i1.jpg";
import i2 from "../sources/i2.jpg";
import i3 from "../sources/i3.jpg";
import i5 from "../sources/i5.jpg";
import i6 from "../sources/i6.jpg";
import i7 from "../sources/i7.png";
import i8 from "../sources/i8.png";
import i4 from "../sources/i4.jpg";
import i44 from "../sources/arjit.jpg";
import voth from '../sources/voth.jpg';
const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found. User is not authenticated.');
        setLoading(false); // Set loading state accordingly
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-cart`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response && response.data) {
          setUserName(response.data.userName);
        } else {
          console.error('No data found in response:', response);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
        console.log('API URL:', process.env.REACT_APP_API_URL);

      } finally {
        setLoading(false); // Always set loading state to false after attempting to fetch data
      }
    };

    fetchUserData();
  }, []);

  const gotoHome = async () => {
    window.location.reload(); // Refresh the page
    navigate("/"); 
  }
  

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      localStorage.removeItem('token');
      setUserName("");
      window.location.href = "/"; // Navigate to the home page and refresh
    }
  };

  return (
    <>
      <section id='part-1'>
        <div className='black-box'>
          <p>Welcome {userName ? userName : ""}!! Free Shipping available worldwide!</p>
        </div>
        <div className='navbar'>
          <p onClick={gotoHome} style={{cursor:"pointer"}}>TRUE HOOD</p>

          <div className='social-icons'>
            <FontAwesomeIcon className="fa-icon" icon={faInstagram} />
            <FontAwesomeIcon className="fa-icon" icon={faShopify} onClick={()=>navigate("/products")} />

            {/* <FontAwesomeIcon className="fa-icon" icon={faFacebook} />
            <FontAwesomeIcon className="fa-icon" icon={faTwitter} />
            <FontAwesomeIcon className="fa-icon" icon={faPinterest} /> */}

           



            <div className="cart-icon" onClick={() => navigate('/get-cart')}>
              <FontAwesomeIcon className="fa-icon" icon={faCart} />
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
            </div>
            <UserDropdown userName={userName} handleLogout={handleLogout} />
          </div>
        </div>
      </section>


      <section id="paint-pic">
        <img src={voth} alt="" />
      </section>

     
     
     
      <section id='home-div'>
    <div className='flex-row hr'>
        <div className='flex-col hc' onClick={() => {navigate("/products/1")}}>
            <img src={i1} className="body-img-top" alt="T-Shirt Green" />
            <img src={i2} className="body-img-hover" alt="T-Shirt Green Hover" />
            <div className="body-body">
                <p className='gray-text'>OVERSIZED T-SHIRT</p>
                <h5 className="body-title">T-Shirt Red</h5>
                <p className="body-text"><span className='break'>₹899.00</span> ₹699.00</p>
                <div className='discount'>-25%</div>
            </div>
        </div>

        <div className='flex-col hc' onClick={() => {navigate("/products/3")}}>
            <img src={i3} className="body-img-top" alt="T-Shirt Green" />
            <img src={i4} className="body-img-hover" alt="T-Shirt Green Hover" />
            <div className="body-body">
                <p className='gray-text'>OVERSIZED T-SHIRT</p>
                <h5 className="body-title">T-Shirt Porsche</h5>
                <p className="body-text"><span className='break'>₹899.00</span> ₹599.00</p>
                <div className='discount'>-36%</div>
            </div>
        </div>

        <div className='flex-col hc' onClick={() => {navigate("/products/5")}}>
            <img src={i5} className="body-img-top" alt="T-Shirt Green" />
            <img src={i6} className="body-img-hover" alt="T-Shirt Green Hover" />
            <div className="body-body">
                <p className='gray-text'>OVERSIZED T-SHIRT</p>
                <h5 className="body-title">T-Shirt Black</h5>
                <p className="body-text"><span className='break'>₹799.00</span> ₹699.00</p>
                <div className='discount'>-21%</div>
            </div>
        </div>

        <div className='flex-col hc' onClick={() => {navigate("/products/7")}}>
            <img src={i7} className="body-img-top" alt="T-Shirt Green" />
            <img src={i8} className="body-img-hover" alt="T-Shirt Green Hover" />
            <div className="body-body">
                <p className='gray-text'>OVERSIZED T-SHIRT</p>
                <h5 className="body-title">T-Shirt Culture</h5>
                <p className="body-text"><span className='break'>₹899.00</span> ₹699.00</p>
                <div className='discount'>-25%</div>
            </div>
        </div>
    </div>
</section>


<section id="part-3">
        <div className='p3-part1'>
          <h3>Discover our<br />
            latest vintage<br />
            editions and <br />
            more collection</h3>

          <p> Our dedication to excellence extends beyond<br/>
          our product
           selection. We believe
           in delivering<br/>
           exceptional customer
           service to ensure your<br/> satisfaction. From the
           moment you browse our website<br/>
           to the time your order arrives at your doorstep,<br/>
           we strive to make every step of your shopping<br/>
           journey seamless and enjoyable.
</p>

          <Link to="/products" style={{ textDecoration: "none" }}><i>view the collections</i></Link>
        </div>
        <div className='p3-part2'>
          <img src={i44} alt='' />
        </div>
      </section>
     
     



      {/* <section id='part-4'>
        <video autoPlay muted loop id="myVideo">
          <source src={background} type="video/mp4" />
        </video>

        <div className='text-area'>
          <p>"Since 2013, we've garnered over 70 awards and have<br />
            generated millions in start-up value, launching some of<br />
            the most iconic tech brands of our era.  After realizing<br />
            that our approach to design generates insane valuation<br />
            metrics, we introduced a new model - our Digital.<br />
            Brand. Accelerator."</p>
        </div>
      </section> */}

      <section id="last">




        <div className='navigate'>
          <h5>NAVIGATE</h5>
          <a href='/products'>Shop</a>
          <a href='/community'>Contact</a>
          {/* <a>Store locator</a> */}
        </div>

        <div className='get-help'>
          <h5>GET HELP</h5>
          <a href='/FAQ'>FAQ</a>
          <a href='/FAQ'>Delivery</a>
          <a href='/FAQ'>Order Process</a>
          <a href='/returns'>Returns</a>
        </div>

        <div className='social'>
          <h5>SOCIAL</h5>
          <a>Instagram</a>
          <a>Facebook</a>
          <a>Pinterest</a>
        </div>

        <div className='customer-service'>
          <h5>CUSTOMER SERVICE</h5>
          <a href='/privacy-policy'>Privacy Policy</a>
          <a href='/customer-care'>Terms & Conditions</a>
          <a href='/FAQ'>Payments</a>
        </div>

        <div className='copy-right'>
          <p>© Copyright 2024 True Hood</p>
        </div>
      </section>
    </>
  );
}

export default Home;



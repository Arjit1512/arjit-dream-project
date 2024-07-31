import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faPinterest, faTwitter, faShopify } from "@fortawesome/free-brands-svg-icons";
import { faShoppingCart as faCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";  // Importing faBars and faTimes
import { Link, useNavigate } from 'react-router-dom';
import bghome from '../sources/bghome.webp';
import axios from 'axios';
import "../App.css";
import './Vengeance.css';
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

const Vengeance = () => {
  
    const [cartItems, setCartItems] = useState([]);
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. User is not authenticated.');
          setLoading(false);
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
          setLoading(false);
        }
      };
  
      fetchUserData();
    }, []);
  
    const gotoHome = async () => {
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
        window.location.href = "/";
      }
    };
  
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
      setProfileMenuOpen(false);
    };
  
    const toggleProfileMenu = () => {
      setProfileMenuOpen(!profileMenuOpen);
    };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    return (
    <div>
         <section id='part-1'>
        <div className='black-box'>
          <p>Free Shipping all over India!</p>
        </div>
        <div className='navbar'>
          <p onClick={gotoHome} style={{ cursor: "pointer" }}>TRUE HOOD</p>

          <div className='social-icons'>
            <FontAwesomeIcon className="fa-icon" icon={faShopify} onClick={() => navigate("/products")} />
            {userName && <div className="cart-icon" onClick={() => navigate('/get-cart')}>
              <FontAwesomeIcon className="fa-icon" icon={faCart} />
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
            </div>}
            <UserDropdown userName={userName} handleLogout={handleLogout} />
          </div>

          <div className='hamburger' onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>

        <div className={`hamburger-menu ${menuOpen ? 'active' : ''}`}>
          <Link to="/products">Sale</Link>
          <Link to="/get-cart">Cart</Link>
          <div className="profile-toggle" onClick={toggleProfileMenu} style={{ cursor: 'pointer' }}>
            My Profile
          </div>
          <div className={`profile-menu ${profileMenuOpen ? 'active' : ''}`}>
            <Link to="/dashboard">My Orders</Link>
            <Link to="/customer-care">Customer Care</Link>
            {userName ? (
              <div onClick={handleLogout}>Logout</div>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </section>


      <section id='vpart2'>
         <h3>Checkout our Cult Collection:</h3>
      </section>


      <section id='home-div'>
        <div className='flex-row hr'>
          <div className='flex-col hc' onClick={() => { navigate("/products/1") }}>
            <img src={i1} className="body-img-top" alt="T-Shirt Green" />
            <img src={i2} className="body-img-hover" alt="T-Shirt Green Hover" />
            <div className="body-body">
              <p className='gray-text'>OVERSIZED T-SHIRT</p>
              <h5 className="body-title">Vengeance of the Hood</h5>
              <p className="body-text"><span className='break'>₹899.00</span> ₹699.00</p>
              <div className='discount'>-23%</div>
            </div>
          </div>

          

          <div className='flex-col hc' onClick={() => { navigate("/products/5") }}>
            <img src={i5} className="body-img-top" alt="T-Shirt Green" />
            <img src={i6} className="body-img-hover" alt="T-Shirt Green Hover" />
            <div className="body-body">
              <p className='gray-text'>OVERSIZED T-SHIRT</p>
              <h5 className="body-title">Vengeance of the Hood</h5>
              <p className="body-text"><span className='break'>₹899.00</span> ₹699.00</p>
              <div className='discount'>-23%</div>
            </div>
          </div>

          
        </div>
      </section>


      <section id="last" className='lven'>




<div className='navigate'>
  <h5>NAVIGATE</h5>
  <a href='/products'>Shop</a>
  <a href='/community'>Contact</a>
  {/* <a>Store locator</a> */}
</div>

<div className='get-help'>
  <h5>GET HELP</h5>
  <a href='/FAQ'>FAQ</a>
  <a href='/returns'>Delivery</a>
  <a href='/returns'>Order Process</a>
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
  <a href='/terms'>Terms & Conditions</a>
  <a href='/FAQ'>Payments</a>
</div>

<div className='copy-right'>
  <p>© Copyright 2024 True Hood</p>
</div>
</section>
    </div>
  )
}

export default Vengeance
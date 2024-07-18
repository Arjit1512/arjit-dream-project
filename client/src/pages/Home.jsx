import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faPinterest, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faShoppingCart as faCart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../App.css";
import UserDropdown from './UserDropdown';
import i1 from "../sources/i1.jpg";
import i2 from "../sources/i2.jpg";
import i3 from "../sources/i3.jpg";
import i5 from "../sources/i5.jpg";
import i6 from "../sources/i6.jpg";
import i44 from "../sources/i4.jpg";
import { storage } from '../firebase/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userName, setUserName] = useState("");
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageRefs = [
          { key: 'arjit', ref: ref(storage, 'statics/arjit.jpg') },
          { key: 'bg', ref: ref(storage, 'statics/bghome.webp') }
        ];

        const urls = await Promise.all(
          imageRefs.map(async ({ key, ref }) => {
            const url = await getDownloadURL(ref);
            return { [key]: url };
          })
        );

        const imagesObj = urls.reduce((acc, curr) => {
          return { ...acc, ...curr };
        }, {});

        setImages(imagesObj);
      } catch (error) {
        console.error("Error fetching images from Firebase:", error);
      }
    };

    fetchImages();
  }, []);




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
    }
  };

  return (
    <> 
      <section id='part-1'>
        <div className='black-box'>
          <p>Welcome {userName ? userName : ""}!! Free Shipping available worldwide!</p>
        </div>
        <div className='navbar'>
          <p>TRUE HOOD</p>

          <div className='social-icons'>
            <FontAwesomeIcon className="fa-icon" icon={faInstagram} />
            <FontAwesomeIcon className="fa-icon" icon={faFacebook} />
            <FontAwesomeIcon className="fa-icon" icon={faTwitter} />
            <FontAwesomeIcon className="fa-icon" icon={faPinterest} />
            <div className="cart-icon" onClick={() => navigate('/cart-page', { state: { cartItems } })}>
              <FontAwesomeIcon className="fa-icon" icon={faCart} />
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
            </div>
            <UserDropdown userName={userName} handleLogout={handleLogout} />
          </div>
        </div>
      </section>


      <section id="paint-pic">
        <img src={images.bg} alt="" />
      </section>

     
     
     
      <section id='home-div'>
        <div className='flex-row hr'>
            <div className='flex-col hc'>
                <img src={i1} className="body-img-top" alt="T-Shirt Green" />
                <img src={i2} className="body-img-hover" alt="T-Shirt Green Hover" />
                <div className="body-body">
                    <p className='gray-text'>OVERSIZED T-SHIRT</p>
                    <h5 className="body-title">T-Shirt Red</h5>
                    <p className="body-text"><span className='break'>₹899.00</span> ₹699.00</p>
                    <div className='discount'>-25%</div>
                </div>
            </div>

            <div className='flex-col hc'>
                <img src={i3} className="body-img-top" alt="T-Shirt Green" />
                <img src={i44} className="body-img-hover" alt="T-Shirt Green Hover" />
                <div className="body-body">
                    <p className='gray-text'>OVERSIZED T-SHIRT</p>
                    <h5 className="body-title">T-Shirt Porsche</h5>
                    <p className="body-text"><span className='break'>₹899.00</span> ₹599.00</p>
                    <div className='discount'>-36%</div>
                </div>
            </div>

            <div className='flex-col hc'>
                <img src={i5} className="body-img-top" alt="T-Shirt Green" />
                <img src={i6} className="body-img-hover" alt="T-Shirt Green Hover" />
                <div className="body-body">
                    <p className='gray-text'>OVERSIZED T-SHIRT</p>
                    <h5 className="body-title">T-Shirt Black</h5>
                    <p className="body-text"><span className='break'>₹799.00</span> ₹699.00</p>
                    <div className='discount'>-21%</div>
                </div>
            </div>

            <div className='flex-col hc'>
                <img src={i1} className="body-img-top" alt="T-Shirt Green" />
                <img src={i2} className="body-img-hover" alt="T-Shirt Green Hover" />
                <div className="body-body">
                    <p className='gray-text'>OVERSIZED T-SHIRT</p>
                    <h5 className="body-title">T-Shirt Red</h5>
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

          <p>Available to purchase on our boutiques<br />
            worldwide. Whether you choose to be a royal<br />
            beauty in couture or to embrace your fairytale<br />
            dream in a GALA creation, each dress is far<br />
            beyond a product - it's a story.</p>

          <Link to="/products" style={{ textDecoration: "none" }}><i>view the collections</i></Link>
        </div>
        <div className='p3-part2'>
          <img src={images.arjit} alt='Arjit' />
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



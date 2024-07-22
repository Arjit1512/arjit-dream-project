import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Clothes from './Clothes.jsx';
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faPinterest, faTwitter, faYoutube, faShopify } from "@fortawesome/free-brands-svg-icons";
import { faShoppingCart as faCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from './CartContext.js';
import axios from 'axios';
import i1 from "../sources/i1.jpg";
import i2 from "../sources/i2.jpg";
import i3 from "../sources/i3.jpg";
import i4 from "../sources/i4.jpg";
import i5 from "../sources/i5.jpg";
import i6 from "../sources/i6.jpg";
import i7 from "../sources/i7.png";
import i8 from "../sources/i8.png";
import i9 from "../sources/pro9.jpg";
import i10 from "../sources/pro10.jpg";
import i11 from "../sources/i11.png";
import i12 from "../sources/i12.png";
import i13 from "../sources/i13.png";
import i14 from "../sources/i14.png";
import i15 from "../sources/i15.png";
import i16 from "../sources/i16.png";
import i17 from "../sources/i17.png";
import i18 from "../sources/i18.png";

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState("");
    const [mainImg, setMainImg] = useState('');
    const [thumbnailImages, setThumbnailImages] = useState([]);
    const [thumbnailStyle, setThumbnailStyle] = useState({});
    const [showExchangeInfo, setShowExchangeInfo] = useState(false);

    const handleNavigation = (path) => {
        navigate(path);
        // window.location.reload();
        window.scrollTo(0, 0);
    };

    const images = {
        1: [i1, i2],
        3: [i3, i4],
        5: [i5, i6],
        7: [i7, i8],
        15: [i15, i16],
        11: [i11, i12],
        13: [i13, i14],
        17: [i17, i18],
        9: [i9],
        10: [i10],
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const fetchedProduct = Clothes.find((p) => p.id === parseInt(id));
                setProduct(fetchedProduct);
                setMainImg(fetchedProduct.imgURL);

                if ([9, 10].includes(fetchedProduct.id)) {
                    // For products 9 and 10, set only the main image
                    setThumbnailImages([fetchedProduct.imgURL]); // Include the main image as the only thumbnail
                } else {
                    // For other products, set additional images as thumbnails
                    const productImages = images[fetchedProduct.id] || [];
                    setThumbnailImages([fetchedProduct.imgURL, ...productImages.slice(1)]); // Include the main image and additional thumbnails
                }

                // Set thumbnail style based on category
                if (fetchedProduct.category === 'Accessories') {
                    setThumbnailStyle({ top: '78%' });
                } else {
                    setThumbnailStyle({});
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError('Failed to fetch product details.');
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const handleAddToCart = async () => {
        if (!product) {
            console.error('Product details not available');
            return;
        }

        if (product.category !== 'Accessories' && !selectedSize) {
            alert("Please select a size");
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/login");
            return;
        }

        addToCart({
            productId: product.id,
            quantity: 1,
            price: product.price,
            size: product.category === 'Accessories' ? null : selectedSize
        });

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/add-to-cart`, {
                productId: product.id,
                quantity: 1,
                size: product.category === 'Accessories' ? null : selectedSize,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Add to cart response:', response.data);

            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 2000);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleImageClick = (imgURL) => {
        setMainImg(imgURL);
    };

    const toggleExchangeInfo = () => {
        setShowExchangeInfo(!showExchangeInfo);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <section id='part-1'>
                <div className='black-box'>
                    <p>Free Shipping available worldwide!</p>
                </div>
                <div className='navbar barrr'>
                    <p>TRUE HOOD</p>

                    <div className='social-icons'>
                        <FontAwesomeIcon className="fa-icon" icon={faInstagram} style={{ visibility: "hidden" }} />
                        <FontAwesomeIcon className="fa-icon" icon={faFacebook} style={{ visibility: "hidden" }} />
                        <FontAwesomeIcon className="fa-icon" icon={faTwitter} style={{ visibility: "hidden" }} />
                        <FontAwesomeIcon className="fa-icon" icon={faYoutube} style={{ visibility: "hidden" }} />
                        <FontAwesomeIcon className="fa-icon" icon={faPinterest} style={{ visibility: "hidden" }} />

                        <div className="cart-icon" onClick={() => navigate("/get-cart")}>
                            <FontAwesomeIcon className="fa-icon" icon={faCart} />
                        </div>

                    </div>
                </div>

                <div className='light-border width'></div>
            </section>

            <section id="prodetails" className="section-p1" style={{ paddingBottom: showExchangeInfo ? '4%' : '0%' }}>
                {product && (
                    <div className="single-pro-image">
                        <img id="MainImg" src={mainImg} width="100%" alt="Main Product" />
                    </div>
                )}
                {product && (
                    <div className="single-pro-details">
                        <h1>{product.name}</h1>
                        <h4>{product.category === 'Accessories' ? 'Fashion Accessories' : 'Oversized T-Shirt'}</h4>
                        <h2>₹{product.price}.00</h2>
                        {product.category !== 'Accessories' && (
                            <select onChange={handleSizeChange} value={selectedSize}>
                                <option value="">Select Size</option>
                                <option value="Small">S</option>
                                <option value="Medium">M</option>
                                <option value="Large">L</option>
                                <option value="XL">XL</option>
                            </select>
                        )}
                        <button className="normal" onClick={handleAddToCart}>
                            Add to Cart
                        </button>

                        {showNotification && (
                            <div className="notification">
                                <p>Item added to cart</p>
                            </div>
                        )}

                        <div className='positioning'>
                            <h4>Product Details</h4>
                            <span>
                                Experience ultimate comfort and style with our premium True Hood T-shirt. Crafted from 100% soft, breathable cotton.
                                Whether you're dressing up for a special occasion or keeping it casual, our True Hood T-shirt is the perfect choice for any wardrobe. Elevate your everyday look with the perfect blend of comfort and style.

                            </span>
                        </div>

                        <div className='exchange-info-container'>
                            <div className='exchange-info-header' onClick={toggleExchangeInfo}>
                                <h4>
                                    Exchange & Return Information
                                    <FontAwesomeIcon className='chevron-icon' icon={faChevronDown} />
                                </h4>
                            </div>

                            {showExchangeInfo && (
                                <div className='exchange-information'>
                                    <ul>
                                        <p>1. Cancellation or return requests are accepted only on the same day of the order is placed.</p>
                                        <p>2. If exchanging, the product must be in its original condition and packaging, request should be done before 6 days.</p>
                                        <p>3. Proof of purchase must be provided for processing exchanges.</p>
                                    </ul>
                                    <p>
                                        For more details on our exchange and return policies, <a href="/returns" className="link">click here</a>.
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>
                )}

                {thumbnailImages.length > 0 && (
                    <div className="image-thumbnails" style={thumbnailStyle}>
                        {thumbnailImages.map((thumbnail, index) => (
                            <img
                                key={index}
                                src={thumbnail}
                                alt={`Thumbnail ${index}`}
                                className={`thumbnail ${mainImg === thumbnail ? 'active' : ''}`}
                                onClick={() => handleImageClick(thumbnail)}
                            />
                        ))}
                    </div>
                )}
            </section>


            <section id='home-div' className='home-div-p'>

                <h1> OUR LATEST COLLECTIONS</h1>

                <div className='flex-row hr'>
                    <div className='flex-col hc' onClick={() => handleNavigation("/products/1")}>
                        <img src={i1} className="body-img-top" alt="T-Shirt Green" />
                        <img src={i2} className="body-img-hover" alt="T-Shirt Green Hover" />
                        <div className="body-body">
                            <p className='gray-text'>OVERSIZED T-SHIRT</p>
                            <h5 className="body-title">T-Shirt Red</h5>
                            <p className="body-text"><span className='break'>₹899.00</span> ₹699.00</p>
                            <div className='discount'>-25%</div>
                        </div>
                    </div>

                    <div className='flex-col hc' onClick={() => handleNavigation("/products/3")}>
                        <img src={i3} className="body-img-top" alt="T-Shirt Green" />
                        <img src={i4} className="body-img-hover" alt="T-Shirt Green Hover" />
                        <div className="body-body">
                            <p className='gray-text'>OVERSIZED T-SHIRT</p>
                            <h5 className="body-title">T-Shirt Porsche</h5>
                            <p className="body-text"><span className='break'>₹899.00</span> ₹599.00</p>
                            <div className='discount'>-36%</div>
                        </div>
                    </div>

                    <div className='flex-col hc' onClick={() => handleNavigation("/products/5")}>
                        <img src={i5} className="body-img-top" alt="T-Shirt Green" />
                        <img src={i6} className="body-img-hover" alt="T-Shirt Green Hover" />
                        <div className="body-body">
                            <p className='gray-text'>OVERSIZED T-SHIRT</p>
                            <h5 className="body-title">T-Shirt Black</h5>
                            <p className="body-text"><span className='break'>₹799.00</span> ₹699.00</p>
                            <div className='discount'>-21%</div>
                        </div>
                    </div>

                    <div className='flex-col hc' onClick={() => handleNavigation("/products/7")}>
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
        </>
    );
};

export default ProductDetail;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Clothes from './Clothes.jsx';
// import "../App.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook, faInstagram, faPinterest, faTwitter, faYoutube, faShopify, faShoppingCart } from "@fortawesome/free-brands-svg-icons";
// import { faShoppingCart as faCart } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate, useLocation } from 'react-router-dom';
// import i1 from "../sources/i1.jpg";
// import i2 from "../sources/i2.jpg";
// import i3 from "../sources/i3.jpg";
// import { useCart } from './CartContext.js';
// import axios from 'axios';

// const ProductDetail = () => {
//     const { id } = useParams();
//     const { addToCart } = useCart();
//     const [product, setProduct] = useState(null);
//     const [showNotification, setShowNotification] = useState(false);
//     const navigate = useNavigate();
//     const userId = localStorage.getItem('userId');

//     useEffect(() => {
//         const fetchProductDetails = async () => {
//             try {
//                 const fetchedProduct = Clothes.find((p) => p.id === parseInt(id));
//                 setProduct(fetchedProduct);
//             } catch (error) {
//                 console.error('Error fetching product details:', error);
//             }
//         };

//         fetchProductDetails();
//     }, [id]);

//     const handleAddToCart = async () => {
//         if (!product) {
//             console.error('Product details not available');
//             return;
//         }
    
//         console.log('Product details:', product);
    
//         const selectedImage = `../sources/pro${product.id}.webp`;
    
//         addToCart(selectedImage);
    
//         try {
//             const response = await axios.post(`http://localhost:3001/add-to-cart/${userId}`, {
//                 productId: product.id,
//                 quantity: 1,
//                 price: product.price
//             });
    
//             console.log('Add to cart response:', response.data);
    
//             setShowNotification(true);
    
//             setTimeout(() => {
//                 setShowNotification(false);
//             }, 2000);
//         } catch (error) {
//             console.error('Error updating cart:', error);
//         }
//     };
    

//     return (
//         <>
//             <section id='part-1'>
//                 <div className='black-box'>
//                     <p>Free Shipping available worldwide!</p>
//                 </div>
//                 <div className='navbar'>
//                     <p>ARJIT AVADHANAM</p>

//                     <div className='social-icons'>
//                         <FontAwesomeIcon className="fa-icon" icon={faInstagram} style={{ visibility: "hidden" }} />
//                         <FontAwesomeIcon className="fa-icon" icon={faFacebook} style={{ visibility: "hidden" }} />
//                         <FontAwesomeIcon className="fa-icon" icon={faTwitter} style={{ visibility: "hidden" }} />
//                         <FontAwesomeIcon className="fa-icon" icon={faYoutube} style={{ visibility: "hidden" }} />
//                         <FontAwesomeIcon className="fa-icon" icon={faPinterest} style={{ visibility: "hidden" }} />
//                         <FontAwesomeIcon
//                             className="fa-icon"
//                             onClick={() => navigate("/sale")}
//                             style={{ cursor: "pointer" }}
//                             icon={faShopify}
//                         />
//                         <div className="cart-icon" onClick={() => navigate(`/get-cart/${userId}`)}>
//                             <FontAwesomeIcon className="fa-icon" icon={faCart} />
//                             {/* {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>} */}
//                         </div>
//                     </div>
//                 </div>

//                 <div className='light-border width'></div>
//             </section>

//             <section id="prodetails" className="section-p1">
//                 {product && (
//                     <div className="single-pro-image">
//                         <img id="MainImg" src={product.imgURL} width="100%" alt="" />
//                     </div>
//                 )}
//                 {product && (
//                     <div className="single-pro-details">
//                         <h1>{product.name}</h1>
//                         <h4>Men's Fashion T Shirt</h4>
//                         <h2>{product.price}</h2>
//                         <select fdprocessedid="cwggv">
//                             <option>Select Size</option>
//                             <option>XL</option>
//                             <option>XXL</option>
//                             <option>Small</option>
//                             <option>Large</option>
//                         </select>
//                         <input type="number" value="1" fdprocessedid="1mx0s" />
//                         <button className="normal" onClick={handleAddToCart}>
//                             Add to Cart
//                         </button>

//                         {showNotification && (
//                             <div className="notification">
//                                 <p>Item added to cart</p>
//                             </div>
//                         )}

//                         <div className='positioning'>
//                             <h4>Product Details</h4>
//                             <span>The Gildan Ultra Cotton T-shirt is made from a substantial 6.0 oz. per sq. yd. fabric constructed from 100% cotton, this classic fit preshrunk jersey knit provides unmatched comfort with each wear. Featuring a taped neck and shoulder, and a seamless double-needle collar, and available in a range of colors, it offers it all in the ultimate head-turning package.</span>
//                         </div>
//                     </div>
//                 )}
//             </section>

//             <section id='part-2'>
//                 <div className='light-border width'></div>

//                 <h3>TRY OTHER PRODUCTS</h3>

//                 <div className="testimonial-section">
//                     <div>
//                         <div className='shop-images sale-page'>
//                             <img src={i1} alt='' className='i1'></img>
//                             <img src={i2} alt='' className='i2'></img>
//                             <img src={i3} alt='' className='i2'></img>
//                             <img src={i1} alt='' className='i3'></img>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <div className='light-border width'></div>

//             <section id="last">
//                 <div className='navigate'>
//                     <h5>NAVIGATE</h5>
//                     <a>Shop</a>
//                     <a>About</a>
//                     <a>Contact</a>
//                     <a>Store locator</a>
//                 </div>

//                 <div className='get-help'>
//                     <h5>GET HELP</h5>
//                     <a>FAQ</a>
//                     <a>Delivery</a>
//                     <a>Order Process</a>
//                     <a>Returns</a>
//                 </div>

//                 <div className='social'>
//                     <h5>SOCIAL</h5>
//                     <a>Instagram</a>
//                     <a>Facebook</a>
//                     <a>Tiktok</a>
//                     <a>Pinterest</a>
//                 </div>

//                 <div className='customer-service'>
//                     <h5>CUSTOMER SERVICE</h5>
//                     <a>Privacy Policy</a>
//                     <a>Terms & Conditions</a>
//                     <a>Payments</a>
//                     <a>Let's Act</a>
//                 </div>

//                 <div className='copy-right'>
//                     <p>© Copyright 2023 Arjit Avadhanam</p>
//                 </div>
//             </section>
//         </>
//     )
// }
// export default ProductDetail;
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Clothes from './Clothes.jsx';
// import "../App.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook, faInstagram, faPinterest, faTwitter, faYoutube, faShopify } from "@fortawesome/free-brands-svg-icons";
// import { faShoppingCart as faCart } from "@fortawesome/free-solid-svg-icons";
// import { useCart } from './CartContext.js';
// import axios from 'axios';

// import i1 from "../sources/i1.jpg";
// import i2 from "../sources/i2.jpg";
// import i3 from "../sources/i3.jpg";

// const ProductDetail = () => {
//     const { id } = useParams();
//     const { addToCart } = useCart();
//     const [product, setProduct] = useState(null);
//     const [showNotification, setShowNotification] = useState(false);
//     const navigate = useNavigate();
//     const userId = localStorage.getItem('userId');

//     const endpointUrls = {
//         local: `http://localhost:3001/add-to-cart/${userId}`,
//         remote: `https://arjit-fashion.vercel.app/add-to-cart/${userId}`
//     };

//     useEffect(() => {
//         const fetchProductDetails = async () => {
//             try {
//                 const fetchedProduct = Clothes.find((p) => p.id === parseInt(id));
//                 setProduct(fetchedProduct);
//             } catch (error) {
//                 console.error('Error fetching product details:', error);
//             }
//         };

//         fetchProductDetails();
//     }, [id]);

//     const handleAddToCart = async () => {
//         if (!product) {
//             console.error('Product details not available');
//             return;
//         }

//         console.log('Product details:', product);

//         const selectedImage = `../sources/pro${product.id}.webp`;

//         addToCart(selectedImage);

//         try {
//             const response = await axios.post(endpointUrls.local, {
//                 productId: product.id,
//                 quantity: 1,
//                 price: product.price
//             });

//             console.log('Add to cart response:', response.data);

//             setShowNotification(true);

//             setTimeout(() => {
//                 setShowNotification(false);
//             }, 2000);
//         } catch (error) {
//             console.error('Error updating cart:', error);
//         }
//     };

//     return (
//         <>
//             <section id='part-1'>
//                 <div className='black-box'>
//                     <p>Free Shipping available worldwide!</p>
//                 </div>
//                 <div className='navbar'>
//                     <p>ARJIT AVADHANAM</p>

//                     <div className='social-icons'>
//                         <FontAwesomeIcon className="fa-icon" icon={faInstagram} style={{ visibility: "hidden" }} />
//                         <FontAwesomeIcon className="fa-icon" icon={faFacebook} style={{ visibility: "hidden" }} />
//                         <FontAwesomeIcon className="fa-icon" icon={faTwitter} style={{ visibility: "hidden" }} />
//                         <FontAwesomeIcon className="fa-icon" icon={faYoutube} style={{ visibility: "hidden" }} />
//                         <FontAwesomeIcon className="fa-icon" icon={faPinterest} style={{ visibility: "hidden" }} />
//                         <FontAwesomeIcon
//                             className="fa-icon"
//                             onClick={() => navigate("/sale")}
//                             style={{ cursor: "pointer" }}
//                             icon={faShopify}
//                         />
//                         <div className="cart-icon" onClick={() => navigate(`/get-cart/${userId}`)}>
//                             <FontAwesomeIcon className="fa-icon" icon={faCart} />
//                         </div>
//                     </div>
//                 </div>

//                 <div className='light-border width'></div>
//             </section>

//             <section id="prodetails" className="section-p1">
//                 {product && (
//                     <>
//                         <div className="single-pro-image">
//                             <img id="MainImg" src={product.imgURL} width="100%" alt="" />
//                         </div>
//                         <div className="single-pro-details">
//                             <h1>{product.name}</h1>
//                             <h4>Men's Fashion T Shirt</h4>
//                             <h2>{product.price}</h2>
//                             <select fdprocessedid="cwggv">
//                                 <option>Select Size</option>
//                                 <option>XL</option>
//                                 <option>XXL</option>
//                                 <option>Small</option>
//                                 <option>Large</option>
//                             </select>
//                             <input type="number" value="1" fdprocessedid="1mx0s" />
//                             <button className="normal" onClick={handleAddToCart}>
//                                 Add to Cart
//                             </button>

//                             {showNotification && (
//                                 <div className="notification">
//                                     <p>Item added to cart</p>
//                                 </div>
//                             )}

//                             <div className='positioning'>
//                                 <h4>Product Details</h4>
//                                 <span>The Gildan Ultra Cotton T-shirt is made from a substantial 6.0 oz. per sq. yd. fabric constructed from 100% cotton, this classic fit preshrunk jersey knit provides unmatched comfort with each wear. Featuring a taped neck and shoulder, and a seamless double-needle collar, and available in a range of colors, it offers it all in the ultimate head-turning package.</span>
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </section>

//             <section id='part-2'>
//                 <div className='light-border width'></div>

//                 <h3>TRY OTHER PRODUCTS</h3>

//                 <div className="testimonial-section">
//                     <div>
//                         <div className='shop-images sale-page'>
//                             <img src={i1} alt='' className='i1'></img>
//                             <img src={i2} alt='' className='i2'></img>
//                             <img src={i3} alt='' className='i2'></img>
//                             <img src={i1} alt='' className='i3'></img>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <div className='light-border width'></div>

//             <section id="last">
//                 <div className='navigate'>
//                     <h5>NAVIGATE</h5>
//                     <a>Shop</a>
//                     <a>About</a>
//                     <a>Contact</a>
//                     <a>Store locator</a>
//                 </div>

//                 <div className='get-help'>
//                     <h5>GET HELP</h5>
//                     <a>FAQ</a>
//                     <a>Delivery</a>
//                     <a>Order Process</a>
//                     <a>Returns</a>
//                 </div>

//                 <div className='social'>
//                     <h5>SOCIAL</h5>
//                     <a>Instagram</a>
//                     <a>Facebook</a>
//                     <a>Tiktok</a>
//                     <a>Pinterest</a>
//                 </div>

//                 <div className='customer-service'>
//                     <h5>CUSTOMER SERVICE</h5>
//                     <a>Privacy Policy</a>
//                     <a>Terms & Conditions</a>
//                     <a>Payments</a>
//                     <a>Let's Act</a>
//                 </div>

//                 <div className='copy-right'>
//                     <p>© Copyright 2023 Arjit Avadhanam</p>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default ProductDetail;
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

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState(""); // State to hold selected size

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const fetchedProduct = Clothes.find((p) => p.id === parseInt(id));
                setProduct(fetchedProduct);
            } catch (error) {
                console.error('Error fetching product details:', error);
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
    
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/login");
            return;
        }
    
        console.log('Product details:', product);
    
        addToCart({
            productId: product.id,
            quantity: 1,
            price: product.price,
            size: product.category === 'Accessories' ? null : selectedSize // Include selected size or null for Accessories
        });
    
        try {
            const response = await axios.post('http://localhost:3001/add-to-cart', {
                productId: product.id,
                quantity: 1,
                size: product.category === 'Accessories' ? null : selectedSize, // Include selected size or null for Accessories
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
                        <div className="cart-icon" onClick={() => navigate("/get-cart")}>
                            <FontAwesomeIcon className="fa-icon" icon={faCart} />
                        </div>
                    </div>
                </div>

                <div className='light-border width'></div>
            </section>

            <section id="prodetails" className="section-p1">
                {product && (
                    <div className="single-pro-image">
                        <img id="MainImg" src={product.imgURL} width="100%" alt="" />
                    </div>
                )}
                {product && (
                    <div className="single-pro-details">
                        <h1>{product.name}</h1>
                        <h4>{product.category === 'Accessories' ? 'Fashion Accessories' : 'Men\'s Fashion T Shirt'}</h4>
                        <h2>{product.price}</h2>
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
                                The Gildan Ultra Cotton T-shirt is made from a substantial 6.0 oz. per sq. yd. fabric constructed from 100% cotton,
                                this classic fit preshrunk jersey knit provides unmatched comfort with each wear. Featuring a taped neck and shoulder,
                                and a seamless double-needle collar, and available in a range of colors, it offers it all in the ultimate head-turning package.
                            </span>
                        </div>
                    </div>
                )}
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
    );
}

export default ProductDetail;

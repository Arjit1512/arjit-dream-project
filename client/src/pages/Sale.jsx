import React from 'react';
import '../App.css';
import i1 from "../sources/i1.jpg";
import i2 from "../sources/i2.jpg";
import i3 from "../sources/i3.jpg";
import background1 from "../sources/background1.mp4";
import painting from "../sources/painting.jpeg";
import { useNavigate } from 'react-router-dom';

const Sale = () => {

    const navigate = useNavigate();

    function detailedPage() {
        navigate("/detailedPage");
    }

    function detailedPage2() {
        navigate("/detailedPage2");
    }



    return (
        <>
            <h1 className='heading-sale'>OUR SALE IS LIVE NOW!</h1>
            <section id='video-sale'>
                <video autoPlay muted loop id="myVideo">
                    <source src={background1} type="video/mp4" />
                </video>

                <div className='text-area sale-text'>
                    <h1>Welcome to our brand new collections!</h1>
                    <button onClick={() => navigate("/products")}>Sale</button>

                </div>
            </section>

            <section id='sale-page'>


                <div className='flex-col'>


                    <div className='sale1'>
                        <h1>OUR PRODUCTS</h1>

                        <h6>CASUAL</h6><div className='border-maroon'></div>
                        <div className='flex-row'>
                            <img src={i1} alt='' onClick={detailedPage} />

                            <div className='flex-col comp-of-items'>
                                <h2>Interior & Exterior<br />
                                    Painting</h2>
                                <p>Set the mood with a fresh coat of paint.</p>
                            </div>
                        </div>
                    </div>


                    <div className='sale1'>
                        <div className='flex-row flex-row2'>
                            <img src={i2} alt='' onClick={detailedPage2} />

                            <div className='flex-col comp-of-items'>
                                <h2>Kitchen Cabinet<br />
                                    Re-finishing</h2>
                                <p>Give your wardrobe a facelift and you, a freshlook.</p>
                            </div>
                        </div>
                    </div>

                    <div className='sale1'>
                        <div className='flex-row flex-row2'>
                            <img src={i3} alt='' />

                            <div className='flex-col comp-of-items'>
                                <h2>Wallpaper Installation</h2>
                                <p>Give your favorite room dimension with custom wallpaper</p>
                            </div>
                        </div>
                    </div>

                    <div className='sale1'>
                        <h6>VINTAGE</h6><div className='border-maroon'></div>
                        <div className='flex-row'>
                            <img src={i1} alt='' />

                            <div className='flex-col comp-of-items'>
                                <h2>Interior & Exterior<br />
                                    Painting</h2>
                                <p>Set the mood with a fresh coat of paint.</p>
                            </div>
                        </div>
                    </div>


                </div>


                <div className='div02'>
                    <h6>OUR PROMISE</h6>
                    <p className='space-required'>In order to provide accurate pricing our<br />
                        project manager will meet with you in<br />
                        your home or business to discuss your<br />
                        painting needs.There are many variations<br />
                        of passages ofsuffered alteration in<br />
                        some form, by injected humour, words<br />
                        which don't look even slightly believable.</p>
                    <h6>SEE OUR HANDY WORK</h6>
                    <div className='pg-button'>
                        <button>PROJECT GALLERY</button>
                    </div>

                    <div className='light-border'></div>


                    <div className='div02 div22'>
                        <h6>TESTIMONIALS FROM YELP</h6>
                        <p className='space-required'><i>"In order to provide accurate pricing our<br />
                            project manager will meet with you in<br />
                            your home or business to discuss your<br />
                            painting needs.There are many variations<br />
                            of passages ofsuffered alteration in<br />
                            some form, by injected humour, words<br />
                            which don't look even slightly believable."</i>

                            <br />
                            <br />
                            <span className='name-user'>-POOJYANTH</span></p>

                    </div>

                    <div className='div02 div22'>
                        <p className='space-required'><i>"In order to provide accurate pricing our<br />
                            project manager will meet with you in<br />
                            your home or business to discuss your<br />
                            painting needs.There are many variations<br />
                            of passages ofsuffered alteration in<br />
                            some form, by injected humour, words<br />
                            which don't look even slightly believable."</i>

                            <br />
                            <br />
                            <span className='name-user'>-ABHINAY</span></p>

                    </div>

                </div>
            </section>

            <section id='paint-pic'>
                <img src={painting} alt='' />
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
    )
}

export default Sale
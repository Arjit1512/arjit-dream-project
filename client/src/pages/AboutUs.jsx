import React from 'react';
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faPinterest, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import pixels from "../sources/pexels.mp4";
import background from "../sources/background.mp4";
import i1 from "../sources/i1.jpg";
import i2 from "../sources/i2.jpg";
import i11 from "../sources/i11.png";
import i4 from "../sources/i4.jpg";
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const navigate=useNavigate();
    return (
        <>
            <section id='start-div'>
                <div className='div01'>
                    <h6>ABOUT US</h6>
                    <h2>Small Company. Big results.</h2>
                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of<br />
                        classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin<br />
                        professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,<br />
                        consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature.</p>
                </div>
                <div className='div02'>
                    <h6>CUSTOMIZE YOUR T-SHIRTS</h6>
                    <p>In order to provide accurate pricing, our<br />
                        project manager will get in touch with you<br />
                        to discuss your clothing needs.Also, we are<br />
                        here to satisfy all your specifications<br/>
                        no matter what.</p>
                    <button onClick={()=>navigate("/community")}>START HERE</button>
                </div>
            </section>



            {/* <section id="black-panther-1">
                <div className='bp1'>
                    <h6>FOUNDERS</h6>
                    <h2><i>Meet Arjit & Srawan</i></h2>
                </div>
            </section> */}

            {/* <section id='bp-sandwich'>
                <div className='container-choose'>
                    <h1>WHY CHOOSE US?</h1>
                    <p>Have you ever thought about how nice it would be to find a home repair expert that you trust with all of your home repairs and improvements? Someone that you trust around your family and belongings? Someone that genuinely cares about your home as much as you do? How about somebody that is willing to go the extra mile to ensure that you get exactly what you want?
                        A home service pro with all of these traits will not only make your life easier by saving you time and reducing stress, but can end up saving you money in the long run as well.
                        Since we truly care about your home, you can rest assured that we always do the job right the first time. No more worrying about the kind of quality you will receive.</p>
                </div>
            </section> */}

            {/* <section id="black-panther-2">
                <div className='bp2'>
                    <h4>Band is a multidisciplinary creative studio.</h4>
                    <p>We work together to design, create and produce work that we are proud of for<br />
                        folks that we believe in. We are available for hire in a wide range of creative<br />
                        discilpines for a variety of jobs, projects and gigs.</p>
                </div>

                <div className='img-section'>
                    <img src={hyena} alt="" className='hyena-img' />
                    <div className='shit' >
                        <p>While functionality is important on a website, the design creates the first impression. So, don’t let these awesome<br />
                            websites slip out, explore them and get inspired! Dog Studio is a multidisciplinary creative studio at the intersection<br />
                            of art, design and technology. The website reveals the quality of services they provide for their clients. Typically,<br />
                            excellent projects can boost the credibility or reputation of the brand. With Dog Studio, the featured projects look<br />
                            simple but attractive. Moreover, animations also appear stunning, thanks to GSAP technology. Adding finesse to web<br />
                            components is impressive.</p>

                        <p>Are you stuck in your web design lately? Perhaps you haven’t explored plenty of awesome websites. Why not have a<br />
                            glimpse of these websites to help you unleash your creativity. Here’s Ronin Amsterdam that you can examine if you’re<br />
                            working with a digital studio website. It’s an independent studio dedicated to digital design. The homepage design is<br />
                            creative with a slider to highlight the featured projects. The GSAP integration makes the web design more appealing<br />
                            with smooth and lovely animations. Graceful page transitions also add charm to the website.
                        </p>
                    </div>
                </div>
                <div className='img-section2'>
                    <img src={i1} alt="" className='picture1' />
                    <img src={i2} alt="" className='picture2' />
                    <img src={i1} alt="" className='picture1' />
                    <img src={i2} alt="" className='picture2' />
                </div>
                <div className='hyena'>

                </div>
            </section> */}

            
        </>
    )
}

export default AboutUs
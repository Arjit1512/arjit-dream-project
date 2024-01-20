import React from 'react'
import "../styling/products.css";
import pro1 from "../sources/pro1.webp";
import pro2 from "../sources/pro2.webp";
import pro3 from "../sources/pro3.webp";
import pro4 from "../sources/pro4.webp";
import pro5 from "../sources/pro5.webp";
import pro6 from "../sources/pro6.webp";
import pro7 from "../sources/pro7.webp";
import pro8 from "../sources/pro8.webp";
import bg from "../sources/background-img.webp";
const Products = () => {
  return (
    <>
     <section id="sale-products">
        <div className='slp1'>
          <br /><br /><br />
          <h2>Filter by</h2>
          <div className='gray-line'></div>
          <div className='far-away'>
            <h3>Price</h3>
            <h3>+</h3>
          </div>
          <div className='gray-line'></div>
          <div className='far-away'>
            <h3>Color</h3>
            <h3>+</h3>
          </div>
          <div className='gray-line'></div>
          <div className='far-away'>
            <h3>Size</h3>
            <h3>+</h3>
          </div>
          <div className='gray-line'></div>
        </div>

        <div className='slp2'>
          <h3>All Products</h3>
          <p>This is your category description. It’s a great place to tell customers what this category is<br />
            about, connect with your audience and draw attention to your products.</p>


          <div className='space-btw'>
            <h5>12 products</h5>
            <h5>Sort By: Recommended</h5>
          </div>


          <div className='flex-row'>
            <div className='flex-col slp'>
            <img src={pro1} alt="product.jpg"/>
            <p>I'm a product</p>
            <h6>INR 500.00</h6>
            </div>

            <div className='flex-col slp'>
            <img src={pro2} alt="product.jpg"/>
            <p>I'm a product</p>
            <h6>INR 500.00</h6>
            </div>

            <div className='flex-col slp'>
            <img src={pro3} alt="product.jpg"/>
            <p>I'm a product</p>
            <h6>INR 500.00</h6>
            </div>

            <div className='flex-col slp'>
            <img src={pro4} alt="product.jpg"/>
            <p>I'm a product</p>
            <h6>INR 500.00</h6>
            </div>
          </div>

          
          <div className='flex-row'>
            <div className='flex-col slp'>
            <img src={pro5} alt="product.jpg"/>
            <p>I'm a product</p>
            <h6>INR 500.00</h6>
            </div>

            <div className='flex-col slp'>
            <img src={pro6} alt="product.jpg"/>
            <p>I'm a product</p>
            <h6>INR 500.00</h6>
            </div>

            <div className='flex-col slp'>
            <img src={pro7} alt="product.jpg"/>
            <p>I'm a product</p>
            <h6>INR 500.00</h6>
            </div>

            <div className='flex-col slp'>
            <img src={pro8} alt="product.jpg"/>
            <p>I'm a product</p>
            <h6>INR 500.00</h6>
            </div>
          </div>

        </div>

      </section>
      
      <section id="paint-pic">
      <img src={bg} alt="" />
      </section>

      <div className='slp-last'>
          <h4>ARJIT AVADHANAM</h4>
          <br />
          <p>info@mysite.com</p>
          
          <p>© Copyright 2023 Arjit Avadhanam</p>
      </div>
     
    </>
  )
}

export default Products
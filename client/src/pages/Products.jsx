import React, { useState } from 'react'
import "../styling/products.css";
import bg from "../sources/background-img.webp";
import Clothes from './Clothes.jsx';
import "../App.css";
import { useNavigate } from 'react-router-dom';
const Products = () => {

  function Cloth(props) {

    const navigate = useNavigate();
    
    function handleClick(){
      navigate(`/products/${props.id}`);
    }
    
    return (
      <div className='flex-col slp'>
        <img src={props.img} alt="product.jpg" className='style-cloth' onClick={handleClick}/>
        <p>{props.desc}</p>
        <h6>{props.price}</h6>
      </div>
    );
  }

  function createCloth(clothes) {
    return (
      <Cloth
        id={clothes.id}
        key={clothes.id}
        img={clothes.imgURL}
        desc={clothes.description}
        price={clothes.price}
      />
    );
  }

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


          <div className='flex-row flex-wrap'>
            {Clothes.map(createCloth)}
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
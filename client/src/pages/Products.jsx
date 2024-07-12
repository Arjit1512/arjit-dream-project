import React, { useState } from 'react';
import "../styling/products.css";
import bg from "../sources/background-img.webp";
import Clothes from './Clothes.jsx';
import "../App.css";
import { useNavigate } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Products = () => {
  const [sort, setSort] = useState('Recommended');
  const [filter, setFilter] = useState({ price: false, category: false });
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSortClick = (newSort) => {
    setSort(newSort);
  };

  const handleFilterClick = (type) => {
    setFilter((prevFilter) => ({ ...prevFilter, [type]: !prevFilter[type] }));
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredClothes = Clothes.filter((cloth) => {
    const priceCondition = cloth.price >= priceRange[0] && cloth.price <= priceRange[1];
    const categoryCondition = selectedCategory === 'All' || cloth.category === selectedCategory;
    return priceCondition && categoryCondition;
  });

  const sortedClothes = [...filteredClothes].sort((a, b) => {
    if (sort === 'Price: Low to High') {
      return a.price - b.price;
    } else if (sort === 'Price: High to Low') {
      return b.price - a.price;
    }
    return 0; // Default sorting
  });

  const Cloth = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/products/${props.id}`);
    };

    return (
      <div className='flex-col slp'>
        <img src={props.img} alt="product.jpg" className='style-cloth' onClick={handleClick} />
        <p>{props.name}</p>
        <h6>{props.price}</h6>
      </div>
    );
  };

  const createCloth = (clothes) => {
    return (
      <Cloth
        id={clothes.id}
        key={clothes.id}
        img={clothes.imgURL}
        name={clothes.name}
        desc={clothes.description}
        price={clothes.price}
      />
    );
  };

  return (
    <>
      <section id="sale-products">
        <div className='slp1'>
          <br /><br /><br />
          <h2>Filter by</h2>
          <div className='gray-line'></div>
          <div className='far-away' onClick={() => handleFilterClick('price')}>
            <h3>Price</h3>
            <h3 style={{cursor:"pointer"}}>{filter.price ? '-' : '+'}</h3>
          </div>
          {filter.price && (
            <div style={{ 
              padding: '15px', 
              width: '70%',
              position:'relative',
              right:'4%',
              fontWeight:'600'
            }}>
              <Slider
                range
                min={0}
                max={2000}
                defaultValue={[0, 2000]}
                value={priceRange}
                onChange={handlePriceChange}
                trackStyle={[{ backgroundColor: 'black', height: 5 }]}
                handleStyle={[
                  { borderColor: 'black', backgroundColor: 'black' },
                  { borderColor: 'black', backgroundColor: 'black' }
                ]}
              />
              <div className="price-range">
                <span>₹{priceRange[0]}</span> - <span>₹{priceRange[1]}</span>
              </div>
            </div>
          )}
          <div className='gray-line'></div>
          <div className='far-away' onClick={() => handleFilterClick('category')}>
            <h3>Category</h3>
            <h3 style={{cursor:"pointer"}}>{filter.category ? '-' : '+'}</h3>
          </div>
          {filter.category && (
            <div style={{ 
              padding: '15px', 
              width: '70%',
              position:'relative',
              right:'4%',
              fontWeight:'600'
            }}>
              <select onChange={handleCategoryChange} value={selectedCategory}>
                <option value="All">All</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          )}
          <div className='gray-line'></div>
        </div>

        <div className='slp2'>
          <h3>All Products</h3>
          <p>This is your category description. It’s a great place to tell customers what this category is<br />
            about, connect with your audience and draw attention to your products.</p>

          <div className='space-btw'>
            <h5>{sortedClothes.length} products</h5>
            <select onChange={(e) => handleSortClick(e.target.value)} value={sort}>
              <option value="Recommended">Sort By: Recommended</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
          </div>

          <div className='flex-row flex-wrap'>
            {sortedClothes.map(createCloth)}
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
  );
}

export default Products;
import React, { useState } from 'react';
import "../styling/products.css";
import bg from "../sources/background-img.webp";
import Clothes from './Clothes.jsx';
import "../App.css";
import { useNavigate } from 'react-router-dom';
import Slider from 'rc-slider';
import voth from '../sources/voth.jpg';
import 'rc-slider/assets/index.css';

const Products = () => {
  const [sort, setSort] = useState('Recommended');
  const [filter, setFilter] = useState({ price: false, category: false, collection: false });
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [isSlp1Visible, setIsSlp1Visible] = useState(false);
  const navigate = useNavigate();

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

  const handleCollectionChange = (event) => {
    setSelectedCollection(event.target.value);
  };

  const toggleSlp1Visibility = () => {
    setIsSlp1Visible(!isSlp1Visible);
  };

  const filteredClothes = Clothes.filter((cloth) => {
    const priceCondition = cloth.price >= priceRange[0] && cloth.price <= priceRange[1];
    const categoryCondition = selectedCategory === 'All' || cloth.category === selectedCategory;
    const collectionCondition =
      selectedCollection === 'All' ||
      (selectedCollection === 'Vengeance' && cloth.name === 'Vengeance of the Hood') ||
      (selectedCollection === 'Kendrick Lamar' && cloth.name === 'The Kendrick Lamar Tee');
    return priceCondition && categoryCondition && collectionCondition;
  });

  const sortedClothes = [...filteredClothes].sort((a, b) => {
    if (sort === 'Price: Low to High') {
      return a.price - b.price;
    } else if (sort === 'Price: High to Low') {
      return b.price - a.price;
    }
    return 0; // Default sorting
  });

  const gotoHome = async () => {
    navigate("/");
  }

  const hasProducts = sortedClothes.length > 0;


  const Cloth = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/products/${props.id}`);
    };

    return (
      <div className='flex-col fc slp cloth-props'>
        <img src={props.img} alt="product.jpg" className='style-cloth' onClick={handleClick} />
        <div className='small'>
          <p className='visible'>{props.name}</p>
          <h6>₹{props.price}.00</h6>
        </div>
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
  const gotoVengeance = async () => {
    navigate("/vengeance");
  }


  return (
    <>
      <section id='part-1'>
        <div className='black-box'>
          <p className='blink'>OUR SALE IS LIVE NOW!</p>
        </div>
        <div className='navbar'>
          <p className='unga' style={{ cursor: "pointer" }} onClick={gotoHome}>TRUE HOOD</p>
        </div>
      </section>

      <div className='fbp'>
        <p>Filter By Price</p>
      </div>

      <section id="sale-products">
        <div className={`slp1 ${isSlp1Visible ? 'visible' : 'hidden'}`}>
          <br /><br /><br />
          <h2>Filter by</h2>
          <div className='gray-line'></div>
          <div className='far-away' onClick={() => handleFilterClick('price')}>
            <h3>Price</h3>
            <h3 style={{ cursor: "pointer" }}>{filter.price ? '-' : '+'}</h3>
          </div>
          {filter.price && (
            <div style={{
              padding: '15px',
              width: '70%',
              position: 'relative',
              right: '4%',
              fontWeight: '600'
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
            <h3 style={{ cursor: "pointer" }}>{filter.category ? '-' : '+'}</h3>
          </div>
          {filter.category && (
            <div className="filter-dropdown">
              <select onChange={handleCategoryChange} value={selectedCategory}>
                <option value="All">All</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          )}
          <div className='gray-line'></div>
          <div className='far-away' onClick={() => handleFilterClick('collection')}>
            <h3>Collections</h3>
            <h3 style={{ cursor: "pointer" }}>{filter.collection ? '-' : '+'}</h3>
          </div>
          {filter.collection && (
            <div className="filter-dropdown">
              <select onChange={handleCollectionChange} value={selectedCollection}>
                <option value="All">All</option>
                <option value="Vengeance">Vengeance</option>
                <option value="Kendrick Lamar">Kendrick Lamar</option>
              </select>
            </div>
          )}
          <div className='gray-line filter-gray'></div>
        </div>

        <div className='slp2'>
          <h3>All Products</h3>
          <p>At True Hood, we are committed to providing you with the best possible shopping experience.<br />
            We take pride in offering a diverse range of high-quality products, meticulously made to meet your fashion needs. </p>




          <div className={`space-btw ${hasProducts ? '' : 'invisible'}`}>
            <h5>{sortedClothes.length} products</h5>
            <select onChange={(e) => handleSortClick(e.target.value)} value={sort}>
              <option value="Recommended">Sort By: Recommended</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
          </div>


          <div className='flex-row flex-wrap'>
            {sortedClothes.map(createCloth)}


            {
              !hasProducts && (
                <div className='no-products'>
                  <h4>No products found.</h4>
                </div>
              )
            }
          </div>
        </div>

        <div className='price-slider-container'>
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
      </section>

      <section id="paint-pic">
        <img src={voth} alt="" onClick={gotoVengeance} />
      </section>


      <section id="last" className='hood-leave'>




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
    </>
  );
};

export default Products;


//I CODED IT ON MY OWN


// import React, { useState } from 'react'
// import Cloth from './Cloth';
// import Clothes from './Clothes';
// import './styles.css'

// const App = () => {

//   const clothes = [];
//   const [CategoriesOption, setCategoriesOption] = useState('All');
//   const [CollectionsOption, setCollectionsOption] = useState('All');
//   const [sortedOption, setSortedOption] = useState('Recommended');

//   const [isOpen, setIsOpen] = useState(false);

//   Clothes.map((cloth) => {
//     clothes.push(cloth);
//   })



//   console.log('Final array: ', clothes);
//   console.log('Selected Categories option= ', CategoriesOption);
//   console.log('Selected Collections option= ', CollectionsOption);
//   console.log('Selected Sorted Option: ', sortedOption);
  



//   const sortByCategories = () => {
//     var grouped = {};

//     clothes.forEach((cloth) => {
//       let hashKey = '';
//       if (CategoriesOption === 'All') {
//         hashKey = 'All';
//       }
//       else if (CategoriesOption === 'T-Shirts') {
//         hashKey = cloth.category;
//       }
//       else if (CategoriesOption === 'Accessories') {
//         hashKey = cloth.category;
//       }

//       if (CollectionsOption === 'All') {
//         hashKey += 'All';
//       }
//       else if (CollectionsOption === 'Vengeance') {
//         if (cloth.name.includes('Vengeance')) {
//           hashKey += CollectionsOption;
//         }
//       }
//       else if (CollectionsOption === 'Kendrick Lamar') {
//         if (cloth.name.includes('Kendrick Lamar')) {
//           hashKey += CollectionsOption;
//         }
//       }

//       if (!grouped[hashKey]) grouped[hashKey] = [];

//       grouped[hashKey].push(cloth);
//     })

//     return grouped;
//   }


//   const groupedClothes = sortByCategories();

//   Object.keys(groupedClothes).forEach((hashKey) => {
//      groupedClothes[hashKey].sort((a,b) => {
//       if(sortedOption === 'price-HTOL'){
//         return b.price - a.price;
//       }
//       else if(sortedOption === 'price-LTOH'){
//         return a.price - b.price;
//       }
//       else
//         return 0;
//      })
//   })


//   console.log('Answer DATA---->', groupedClothes);



//   return (
//     <>
//       <div className='info' style={{ padding: '5%' }}>
//         <h5>All Products</h5>
//         <p>At True Hood, we are committed to providing you with the best<br />
//           possible shopping experience.
//           We take pride in offering a diverse range of high-quality products, <br />
//           meticulously made to meet your fashion needs.</p>
//       </div>

//       <button style={{ cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>Filter</button>



//       <div style={{marginLeft:"85%", marginBottom:'2%'}}>
//         <span>Sort By: </span>
//         <select style={{ marginLeft: "5%" }} onChange={(e) => setSortedOption(e.target.value)}>
//           <option value="Recommended">Recommended</option>
//           <option value="price-HTOL">Price: High to Low</option>
//           <option value="price-LTOH">Price: Low to High</option>
//         </select>
//       </div>

//       {isOpen && (
//         <div className='popup-menu' style={{ width: '210px' }}>
//           <div className='menu-item'>
//             <span>Categories: </span>
//             <select onChange={(e) => setCategoriesOption(e.target.value)}>
//               <option value="All">All</option>
//               <option value="T-Shirts">T-Shirts</option>
//               <option value="Accessories">Accessories</option>
//             </select>
//           </div>

//           <div className='menu-item'>
//             <span>Collections: </span>
//             <select onChange={(e) => setCollectionsOption(e.target.value)}>
//               <option value="All">All</option>
//               <option value="Vengeance">Vengeance</option>
//               <option value="Kendrick Lamar">Kendrick Lamar</option>
//             </select>
//           </div>

//         </div>
//       )}

//       <div className='' style={{ display: "flex", flexDirection: "wrap",marginRight:"2%" }} >
//         {groupedClothes[CategoriesOption + CollectionsOption]?.length > 0 ? (
//           groupedClothes[CategoriesOption + CollectionsOption].map((cloth) => {
//             return <Cloth key={cloth.id} imgURL={cloth.imgURL} name={cloth.name} price={cloth.price} />
//           })
//         ) : (
//           <p>No products found</p>
//         )}
//       </div>




//     </>
//   )
// }

// export default App
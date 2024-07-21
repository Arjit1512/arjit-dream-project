// import './App.css';
// import { Routes, Route } from 'react-router-dom';
// import Home from '../src/pages/Home.jsx';
// import AboutUs from '../src/pages/AboutUs.jsx';
// import Sale from '../src/pages/Sale.jsx';
// import Community from '../src/pages/Community.jsx';
// import DetailedPage from '../src/pages/DetailedPage.jsx';
// import DetailedPage2 from '../src/pages/DetailedPage2.jsx';
// import CartPage from '../src/pages/CartPage.jsx';
// import Login from '../src/pages/Login.jsx';
// import Register from '../src/pages/Register.jsx';
// import Products from '../src/pages/Products.jsx';
// import ProductDetail from '../src/pages/ProductDetail.jsx';
// import CartDetail from '../src/pages/CartDetail.jsx';
// import Success from '../src/pages/Success.jsx';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function App() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/get-cart",`https://arjit-fashion.vercel.app/get-cart`,);
//         setUsers(response.data);
//       } catch (error) {
//         console.log("Error fetching cart data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);
  
//   if (loading) {
//     return <div>Loading...</div>;
//   }
  
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about-us" element={<AboutUs />} />
//         <Route path="/sale" element={<Sale />} />
//         <Route path="/community" element={<Community />} />
//         <Route path="/community/:id" element={<Community />} />
//         <Route path="/success" element={<Success />} />
//         <Route path="/detailedPage" element={<DetailedPage />} />
//         <Route path="/detailedPage2" element={<DetailedPage2 />} />
//         <Route path="/cart-page" element={<CartPage />} />
//         <Route path="/get-cart/:id" element={<CartDetail users={users} />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/products/:id" element={<ProductDetail />} />
//       </Routes>
//     </div>
//   );
// }

// import './App.css';
// import { Routes, Route } from 'react-router-dom';
// import Home from '../src/pages/Home.jsx';
// import AboutUs from '../src/pages/AboutUs.jsx';
// import Sale from '../src/pages/Sale.jsx';
// import Community from '../src/pages/Community.jsx';
// import DetailedPage from '../src/pages/DetailedPage.jsx';
// import DetailedPage2 from '../src/pages/DetailedPage2.jsx';
// import CartPage from '../src/pages/CartPage.jsx';
// import Login from '../src/pages/Login.jsx';
// import Register from '../src/pages/Register.jsx';
// import Products from '../src/pages/Products.jsx';
// import ProductDetail from '../src/pages/ProductDetail.jsx';
// import CartDetail from '../src/pages/CartDetail.jsx';
// import Success from '../src/pages/Success.jsx';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function App() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const endpointUrls = {
//     local: "http://localhost:3001/get-cart",
//     remote: "https://arjit-fashion.vercel.app/get-cart"
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(endpointUrls.local);
//         setUsers(response.data);
//       } catch (error) {
//         console.log("Error fetching cart data:", error);
//         try {
//           const response = await axios.get(endpointUrls.remote);
//           setUsers(response.data);
//         } catch (remoteError) {
//           console.log("Error fetching cart data from remote:", remoteError);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);
  
//   if (loading) {
//     return <div>Loading...</div>;
//   }
  
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about-us" element={<AboutUs />} />
//         <Route path="/sale" element={<Sale />} />
//         <Route path="/community" element={<Community />} />
//         <Route path="/community/:id" element={<Community />} />
//         <Route path="/success" element={<Success />} />
//         <Route path="/detailedPage" element={<DetailedPage />} />
//         <Route path="/detailedPage2" element={<DetailedPage2 />} />
//         <Route path="/cart-page" element={<CartPage />} />
//         <Route path="/get-cart/:id" element={<CartDetail users={users} />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/products/:id" element={<ProductDetail />} />
//       </Routes>
//     </div>
//   );
// }

import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Sale from './pages/Sale';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PP';
import Returns from './pages/Returns';
import Community from './pages/Community';
import DetailedPage from './pages/DetailedPage';
import DetailedPage2 from './pages/DetailedPage2';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CartDetail from './pages/CartDetail';
import Dashboard from './pages/Dashboard';
import CartContext from './pages/CartContext';
import Success from './pages/Success';
import CustomerCare from './pages/CustomerCare';
import { CartProvider } from './pages/CartContext'; 

const App = () => {
  return (
    <CartProvider> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/sale" element={<Sale />} />
      <Route path="/FAQ" element={<FAQ />} />
      <Route path="/returns" element={<Returns />} />
      <Route path="/community" element={<Community />} />
      <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
      <Route path="/detailedPage" element={<DetailedPage />} />
      <Route path="/detailedPage2" element={<DetailedPage2 />} />
      <Route path="/cart-page" element={<CartPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/update-cart" element={<CartDetail />} />
      <Route path="/get-cart" element={<CartDetail />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/checkout' element={<CartDetail />} />
      <Route path='/customer-care' element={<CustomerCare />} />
      <Route path="/success" element={<Success />} />
    </Routes>
    </CartProvider>
  );
};

export default App;

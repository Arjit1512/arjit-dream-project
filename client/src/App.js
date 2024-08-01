import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Sale from './pages/Sale';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PP';
import Returns from './pages/Returns';
import Community from './pages/Community';
import DetailedPage from './pages/DetailedPage';
import DetailedPage2 from './pages/DetailedPage2';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Vengeance from './pages/Vengeance';
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
      <Route path='/terms' element={<Terms />} />
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
      <Route path="/vengeance" element={<Vengeance />} />
      <Route path="/success" element={<Success />} />
    </Routes>
    </CartProvider>
  );
};

export default App;

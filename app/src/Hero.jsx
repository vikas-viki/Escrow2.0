import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Profile } from "./pages";
import Homepage from "./pages/Homepage";
import Layout from "./components/Layout";
import Approve from "./pages/Approve";
import ProductDetails from "./pages/ProductDetails";
import ListNewProduct from "./pages/ListNewProduct";
import Cart from "./pages/Cart";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      offset: 100,
      delay: 200,
      once: true,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="home" element={<Layout />}>
          <Route path="/home/list" element={<ListNewProduct />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/profile' element={<Profile />} />
          <Route path='/home/approve' element={<Approve />} />
          <Route path='/home/cart' element={<Cart />} />
          <Route path="/home/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Hero;

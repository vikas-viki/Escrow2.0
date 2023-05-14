import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateCampaign, Home } from "./pages";
import Homepage from "./pages/Homepage";
import Layout from "./components/Layout";
import Listings from "./pages/Listings";

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
          <Route path="/home/list" element={<CreateCampaign />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/listings' element={<Listings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Hero;

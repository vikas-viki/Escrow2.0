import React, { useEffect } from "react";
import bike from "./assets/bike.png";
import rect from "./assets/rect.png";
import house from "./assets/home.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home } from "./pages";

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
        <Route
          path="/"
          exact
          element={
            <div className="bg-[#0A1A2A] w-auto flex flex-col align-middle p-[42px] h-[100vh]">
              <div className=" font-semibold font-epilogue text-[1.175rem] text-[#F8F0F0] tracking-[0.8px] text-left">
                <span>Web3safebridge</span>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-80 gap-y-32 p-8 h-full items-center">
                <div className="flex flex-col gap-[100px]">
                  <div className="flex flex-col gap-7">
                    <span
                      data-aos="fade-down"
                      className="text-[3.75rem] font-poppins font-medium text-white w-[500px] leading-[65px]"
                    >
                      Escrow made simple.
                    </span>
                    <span
                      data-aos="fade-right"
                      className="text-[1.375rem] text-[#CFCFCF] font-poppins w-[460px]"
                    >
                      Experience hassle free transactions with our web3 powered
                      escrow platform.
                    </span>
                  </div>
                  <div>
                    <button
                      data-aos="fade-up-right"
                      className="bg-[#4F4FDE] px-[23px] rounded-[4px] py-[16px] text-[#EEEEEE] text-[1.188rem]"
                    >
                      <Link to="/home">Explore now</Link>
                    </button>
                  </div>
                </div>
                <div className="img-frame select-none">
                  <img
                    src={house}
                    alt="house"
                    data-aos="fade-left"
                    className="select-none house frame-img"
                  />
                  <img
                    src={rect}
                    alt="rect"
                    data-aos="fade-left"
                    className="select-none rect frame-img"
                  />
                  <img
                    src={bike}
                    alt="bike"
                    data-aos="fade-left"
                    className="select-none bike frame-img"
                  />
                </div>
              </div>
            </div>
          }
        />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Hero;

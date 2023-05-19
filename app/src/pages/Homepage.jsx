import React from "react";
import { Link } from "react-router-dom";
import bike from "../assets/bike.png";
import rect from "../assets/rect.png";
import house from "../assets/home.png";
import { mainlogo } from "../assets";

const Homepage = () => {
  return (
    <div className="bg-[#0A1A2A] w-auto flex flex-col align-middle p-[42px] min-h-screen">
      <div className="font-semibold font-epilogue text-[1.175rem] flex items-center gap-[10px] text-[#F8F0F0] tracking-[0.8px] text-left">
        <img src={mainlogo} width="30" className="rounded" alt="W3" />
        <span>Web3safebridge</span>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-8 gap-y-8  sm:gap-x-80 sm:gap-y-32 p-8 sm:h-full items-center mt-[100px]">
        <div className="flex flex-col gap-8 sm:gap-16">
          <div className="flex flex-col gap-4">
            <span
              data-aos="fade-down"
              className="text-[3.75rem] font-poppins font-medium text-white max-w-[500px] leading-[65px] text-center sm:text-left"
            >
              Escrow made simple.
            </span>
            <span
              data-aos="fade-right"
              className="text-[1.375rem] text-[#CFCFCF] font-poppins max-w-[460px] text-center sm:text-left"
            >
              Experience hassle-free transactions with our web3 powered escrow
              platform.
            </span>
          </div>
          <div className="flex justify-center sm:justify-start">
            <Link to="/home">
              <button
                data-aos="fade-up-right"
                className="bg-[#4F4FDE] px-[23px] rounded-[4px] py-[16px] text-[#EEEEEE] text-[1.188rem]"
              >
                Explore now
              </button>
            </Link>
          </div>
        </div>
        <div className="img-frame select-none hidden sm:flex justify-center">
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
  );
};

export default Homepage;

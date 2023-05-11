import React from "react";
import { useNavigate } from "react-router-dom";

import FundCard from "./FundCard";
import { loader } from "../assets";

const Displaylistings = ({ title, isLoading, listings }) => {
  const navigate = useNavigate();

  const handleNavigate = (listing) => {
    navigate(`/listing-details/${listing.title}`, { state: listing });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({!isLoading && listings.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && listings.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            {window.location.pathname === "/home"
              ? "No listings yet."
              : "You have not created any listings yet."}
          </p>
        )}

        {!isLoading &&
          listings.length > 0 &&
          listings.map((listing, i) => (
            <FundCard
              key={i}
              {...listing}
              handleClick={() => handleNavigate(listing)}
            />
          ))}
      </div>
    </div>
  );
};

export default Displaylistings;

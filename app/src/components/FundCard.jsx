import React from "react";

import { creator, tagType } from "../assets";

const FundCard = ({
  0: amount,
  1: title,
  2: description,
  3: image,
  4: bought,
  5: seller,
  6: created,
  handleClick,
}) => {
  function getTimeElapsed(timestamp) {
    const now = new Date().getTime();
    const timeDiff = (now - timestamp * 1000) / 1000;
    if (timeDiff >= 86400) {
      const days = Math.floor(timeDiff / 86400);
      return days + (days === 1 ? " day" : " days") + " ago";
    } else if (timeDiff >= 3600) {
      const hours = Math.floor(timeDiff / 3600);
      return hours + (hours === 1 ? " hour" : " hours") + " ago";
    } else if (timeDiff >= 60) {
      const minutes = Math.floor(timeDiff / 60);
      return minutes + (minutes === 1 ? " minute" : " minutes") + " ago";
    } else {
      return "Just now";
    }
  }
  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            Listings
          </p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description.slice(0, 20) + (description.length >= 20 ? "..." : ".")}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {"$ " + amount.toString()}
            </h4>
          </div>
          <div className="flex flex-col">
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              {getTimeElapsed(created.toString())}
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={creator}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{seller}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;

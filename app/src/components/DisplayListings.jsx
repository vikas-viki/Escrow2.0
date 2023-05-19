import React from "react";
import { tagType } from "../assets";
import { loader } from "../assets";
import { useStateContext } from "../context";

const DisplayListings = ({ title, isLoading, list }) => {

  const {getTimeElapsed} = useStateContext();

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({list.length})
      </h1>

      <div
        className={`flex flex-wrap mt-[20px] gap-[26px] ${
          list.length === 0 && "justify-center"
        }`}
      >
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && list.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not listed any products yet
          </p>
        )}

        {!isLoading &&
          list.length > 0 &&
          list.map((product, i) => {
            const {
              0: amount,
              1: _title,
              2: description,
              3: image,
              4: bought,
              6: created,
            } = product;
            return (
              <div
                key={i}
                className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] "
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
                      Listed
                    </p>
                  </div>

                  <div className="block">
                    <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
                      {_title}
                    </h3>
                    <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
                      {description}
                    </p>
                  </div>

                  <div className="flex justify-between flex-wrap mt-[15px] gap-2">
                    <div className="flex flex-col">
                      <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
                        {"$ " + amount.toString()}
                      </h4>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
                        {getTimeElapsed(created.toString())}
                      </h4>
                    </div>
                  </div>
                  <div
                    className={`flex justify-center w-full text-center mt-[12px] ${
                      bought === true ? "bg-green-500" : "bg-red-400"
                    } font-epilogue font-semibold text-[16px] leading-[26px] text-white py-[12px] px-4 rounded-[10px]`}
                  >
                    {bought === true ? "Sold" : "Yet to be sold"}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DisplayListings;

import React, { useState } from "react";
import { tagType } from "../assets";
import { loader } from "../assets";
import { CustomButton } from ".";
import { useStateContext } from "../context";

const DisplayApprovals = ({ title, isLoading, products }) => {
  const { approveListing, getTimeElapsed } = useStateContext();
  const [productStatus, setProductStatus] = useState(true);

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({products.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && products.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You don't have any products to be approved.
          </p>
        )}

        {!isLoading &&
          products.length > 0 &&
          products.map((product, i) => {
            const [
              amount,
              title,
              description,
              image,
              bought,
              seller,
              created,
              _contract,
              approved,
            ] = product;
            console.log(product);
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
                      Approvals
                    </p>
                  </div>

                  <div className="block">
                    <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
                      {title}
                    </h3>
                    <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
                      {description.slice(0, 20) +
                        (description.length >= 20 ? "..." : ".")}
                    </p>
                  </div>

                  <div className="flex justify-between flex-wrap mt-[15px] gap-2">
                    <div className="flex flex-col">
                      <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                        $ {amount}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
                        {getTimeElapsed(created)}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center flex-col mb-[10px]">
                  <div className="px-[18px] ">
                    <span className="font-epilogue font-semibold text-[#9f9fab]  text-left leading-[18px] mb-[10px]">
                      Product status{" "}
                    </span>
                    <br />
                    {!approved && (
                      <>
                        <label
                          htmlFor="productStatus1"
                          className="font-epilogue font-normal text-[#808191] text-left leading-[18px]"
                        >
                          {" "}
                          Good{" "}
                        </label>
                        <input
                          type="radio"
                          name="productStatus"
                          id="productStatus1"
                          onClick={(e) => {
                            setProductStatus(e.target.value);
                          }}
                        />
                        <label
                          htmlFor="productStatus2"
                          className="font-epilogue font-normal text-[#808191] text-left leading-[18px]"
                        >
                          {" "}
                          Not good{" "}
                        </label>
                        <input
                          type="radio"
                          name="productStatus"
                          id="productStatus2"
                          onClick={(e) => {
                            setProductStatus(e.target.value);
                          }}
                        />
                      </>
                    )}
                    <CustomButton
                      btnType="button"
                      title={
                        approved === true ? "Approved" : "Approve the product"
                      }
                      styles={`bg-[#8c6dfd] w-full mt-[10px] ${
                        approved === true && "disabled"
                      }`}
                      handleClick={() => {
                        approved === false &&
                          approveListing(_contract, productStatus);
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DisplayApprovals;

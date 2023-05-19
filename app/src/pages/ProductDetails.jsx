import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
import { requester } from "../assets";

const ProductDetails = () => {
  const [arbiteraddress, setArbiteraddress] = useState("");
  const [eth, setEth] = useState(0);
  const {
    getTimeElapsed,
    isLoading,
    currentProduct,
    buyListing,
  } = useStateContext();

  const getETH = async(usd) => {
    const eth = await currentProduct[7].convertUSDToEther(usd);
    const _eth = (Number(eth) / 1000000000000000000).toString().slice(0, 6);
    setEth(_eth);
  }

  useEffect(()=>{
    getETH(currentProduct[0]);
  },[]);

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={currentProduct[3]}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Listed" value={getTimeElapsed(currentProduct[6]).split(' ')[0] +" " +  getTimeElapsed(currentProduct[6]).split(' ')[1]} />
          <CountBox title={"Amount"} value={"$"+currentProduct[0]} />
          <CountBox title="ETH value" value={eth} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={requester}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue text-[14px] text-white break-all">
                  {currentProduct[5]}
                </h4>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Description
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {currentProduct[2]}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            BUY
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[19px] leading-[30px] text-center text-[#808191]">
              Buy the product
            </p>
            <div className="mt-[30px]">
              <label
                htmlFor="arbiterAdd"
                className="font-epilogue fount-medium text-[15px] leading-[30px] text-center text-[#808191]"
              >
                Approver address *
              </label>
              <input
                type="text"
                placeholder="0xab34c2d47d..."
                step="0.01"
                required
                id="arbiterAdd"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={arbiteraddress}
                onChange={(e) => setArbiteraddress(e.target.value)}
              />
              <CustomButton
                btnType="button"
                title="Buy product"
                styles="w-full bg-[#8c6dfd] mt-[15px]"
                handleClick={() => {
                  buyListing(currentProduct[7], arbiteraddress);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

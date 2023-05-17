import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../Context";

const Howitworks = () => {
  const { setIsActive } = useStateContext();
  return (
    <div className="mt-16">
      <h1
        data-aos="fade-down"
        className="font-epilogue font-bold text-3xl leading-6 text-white"
      >
        How it works?
      </h1>
      <div className="my-6" data-aos="fade-left">
        <h3 className="font-epilogue font-bold text-base leading-6 text-gray-600">
          The seller lists their product with the required details and a fixed
          price in dollars, unaffected by changes in the ETH price.
        </h3>
      </div>
      <div className="my-6" data-aos="fade-right">
        <h3 className="font-epilogue font-bold text-base leading-6 text-gray-600">
          The buyer purchases the product by paying the equivalent amount in ETH
          (Ethereum) and provides the address of the product inspector
          (approver).
        </h3>
      </div>
      <div className="my-6" data-aos="fade-left">
        <h3 className="font-epilogue font-bold text-base leading-6 text-gray-600">
          The approver inspects the product and marks it as{" "}
          <span className="text-green-400">Good</span> if it meets the
          requirements. If not, it will be marked as{" "}
          <span className="text-orange-400">Not Good</span>,{" "}
          <Link
            to="/home/approve"
            className="text-blue-700"
            onClick={() => {
              setIsActive("approve");
            }}
          >
            here.
          </Link>
        </h3>
      </div>
      <div className="my-6" data-aos="fade-right">
        <ul className="font-epilogue font-bold text-base leading-6 text-gray-600">
          <li>
            If the product is approved as Good, the deposited amount will be
            sent to the seller.
          </li>
          <li>
            If the product is approved as Not Good, the deposited amount will be
            sent back to the buyer.
          </li>
        </ul>
      </div>
      <div className="my-6" data-aos="fade-left">
        <h3 className="font-epilogue font-bold text-base leading-6 text-gray-600">
          That's how simple it is!
        </h3>
      </div>
    </div>
  );
};

export default Howitworks;

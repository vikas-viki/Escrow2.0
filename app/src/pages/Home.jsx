import React, { useState, useEffect } from "react";
import { useStateContext } from "../Context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar, Sidebar } from "../components";
import ConnectMetamask from "../components/ConnectMetamask";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { address, contract, listingDetailsWithData, getAllListingDetails } =
    useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    await getAllListingDetails();
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address]);

  return (
    <>
      <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>

        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />
          {!address ? (
            <ConnectMetamask />
          ) : (
            <div>
              hello
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
// <DisplayCampaigns
//   title="All Listings"
//   isLoading={isLoading}
//   listings={listingDetailsWithData}
// />
// import { DisplayCampaigns } from "../components";

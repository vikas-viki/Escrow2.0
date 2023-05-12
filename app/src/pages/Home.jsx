import React, { useState, useEffect } from "react";
import { useStateContext } from "../Context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar, Sidebar } from "../components";
import ConnectMetamask from "../components/ConnectMetamask";
import { DisplayCampaigns } from "../components";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { address, contract, listingDetailsWithData, getAllData, listings } =
    useStateContext();

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      await getAllData();
      setIsLoading(false);
      console.log(listingDetailsWithData);
    };
    if (contract) fetchCampaigns();
  }, [address, contract]);

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
            <>
              {listingDetailsWithData.length > 0 && (
                <>
                  {console.log(listingDetailsWithData)}
                  <DisplayCampaigns
                    title="All Listings"
                    isLoading={isLoading}
                    listings={listingDetailsWithData}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

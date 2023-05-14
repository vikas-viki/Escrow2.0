import React, { useEffect } from "react";
import DisplayListings from "../components/DisplayListings.jsx";
import { useStateContext } from "../Context/index.js";

const Listings = () => {

  const { isLoading, setIsLoading, getuserListedProducts, userListedProducts, address, contract } = useStateContext();




  return (
    <DisplayListings
      title="Your listings"
      isLoading={isLoading}
      list={userListedProducts}
    />
  );
};

export default Listings;

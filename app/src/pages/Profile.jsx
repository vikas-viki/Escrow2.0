import React from "react";
import DisplayListings from "../components/DisplayListings.jsx";
import { useStateContext } from "../context/index.js";

const Listings = () => {
  const { isLoading, userListedProducts } = useStateContext();

  return (
    <DisplayListings
      title="Your listings"
      isLoading={isLoading}
      list={userListedProducts}
    />
  );
};

export default Listings;

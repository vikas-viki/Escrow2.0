import React from "react";
import { useStateContext } from "../Context/index.js";
import DisplayBuyings from "../components/DisplayBuyings.jsx";

const Cart = () => {
  const { isLoading, userBroughtProducts } = useStateContext();

  return (
    <DisplayBuyings
      title="Your buyings"
      isLoading={isLoading}
      products={userBroughtProducts}
    />
  );
};

export default Cart;

import React from "react";
import { useStateContext } from "../context/index.js";
import DisplayApprovals from "../components/DisplayApprovals.jsx";

const Approve = () => {
  const { isLoading, arbiterProducts } = useStateContext();

  return (
    <DisplayApprovals
      title="Your approvals"
      isLoading={isLoading}
      products={arbiterProducts}
    />
  );
};

export default Approve;

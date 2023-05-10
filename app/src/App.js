import React, { useEffect } from "react";
import { useStateContext } from "./context";

function App() {

  const { createNewList, connect, address, getListings} = useStateContext();

  async function getData(){
    await connect();
    await getListings();
  }
  useEffect(() => {
    getData();
  }, [address]);

  return (
    <div>
      hello
    </div>
  );
}

export default App;


import React, { useEffect } from "react";
import { useStateContext } from "./context";

function App() {

  const { createNewList, connect, address,  } = useStateContext();

  async function getData(){
    await connect();
    await createNewList();
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


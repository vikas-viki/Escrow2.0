import React from "react";
import { useStateContext } from "./context";
import Hero from "./pages/Hero.jsx";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const { address } = useStateContext();


  return (
    <BrowserRouter >
      <Routes>
        <Route exact path="/" element={<Hero />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


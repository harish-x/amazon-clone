import React, { useEffect } from "react";
import Sliders from "../components/Sliders";
import Products from "../components/products/Products";
import MetaData from "../components/MetaData";

const HomePage = () => {

  
  
  return (
    <>
      <MetaData title={"Buy Best products"} />
      <Sliders />
      <Products />
    </>
  );
};

export default HomePage;

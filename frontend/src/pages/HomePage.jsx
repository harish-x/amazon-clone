import React, { useEffect } from "react";
import Sliders from "../components/Sliders";
import Products from "../components/products/Products";
import MetaData from "../components/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/ProductsFeatures";
import Spinner from "../components/spinner/Spinner";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const { status } = useSelector((state) => state.productsState);

  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : status == "success" ? (
        <>
          <MetaData title={"Buy Best products"} />
          <Sliders />
          <Products />
        </>
      ) : null}
    </>
  );
};

export default HomePage;

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../features/ProductFeature";
import { useParams } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import toast from "react-hot-toast";
import MetaData from "../MetaData";
import ProductQuantity from "./ProductQuantity";
import { AddCartItem } from "../../features/CartFeatures";
import { unwrapResult } from "@reduxjs/toolkit";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProduct(id));
  }, []);
  const { product, status, error } = useSelector((state) => state.productState);

  if (error !== null) {
    toast.error(error);
  }
  const [quantity, setQuantity] = useState();

  const getQuantity = useCallback((data) => {
    setQuantity(data);
  });
  function addtocart(_id) {
    console.log(_id);
    dispatch(AddCartItem({ _id, quantity }))
      .then(unwrapResult)
      .then(() =>
        toast.success("added to cart", { position: "bottom-center" })
      );
  }

  return (
    <>
      {error ? (
        <div>Product is not available</div>
      ) : status === "loading" ? (
        <Spinner />
      ) : status === "success" ? (
        <div className="bg-white h-[100dvh]">
          <MetaData title={product?.product?.name} />
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                <li>
                  <div className="flex items-center">
                    <a
                      href=""
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {product?.product?.category}
                    </a>
                    <svg
                      fill="currentColor"
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>

                <li className="text-sm">
                  <a
                    href=""
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    {product?.product?.name}
                  </a>
                </li>
              </ol>
            </nav>
            <div className="mx-auto max-w-2xl grid grid-flow-row grid-rows-1 grid-cols-2 space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="">
                <img
                  src="https://m.media-amazon.com/images/I/714UFzp5O7L._SX679_.jpg"
                  alt=""
                  srcset=""
                />
              </div>
              <div className=" my-auto">
                <p className="text-3xl py-4">{product.product.name}</p>
                <p className="text-xl py-4">{product.product.description}</p>
                {product.product.stock > 1 ? (
                  <p className="text-green-600 text-xl pt-4">In stock</p>
                ) : (
                  <p className="text-red-600 text-xl py-4">Out of stock</p>
                )}
                <p className="text-xl py-2 ">
                  <span className="text-red-500">-50%</span>&nbsp; &#8377;{" "}
                  {product.product.price}
                </p>
                <p className="text-gray-500 text-xs">
                  free delivery over &#8377;500
                </p>
                {product.product.price > 500 ? (
                  <p className="text-xl py-2">Free Delivery</p>
                ) : (
                  <p className="text-base py-2">Delivery charge &#8377; 60</p>
                )}
                    <hr />
                    <div className="max-w-28">
                       <div className="mt-4">
                  <ProductQuantity
                    stock={product.product.stock}
                    qunt={getQuantity}
                  />
                </div>
                    </div>
               
                <button
                  type="button"
                  onClick={() => addtocart(product.product._id)}
                  className="bg-yellow-400 mt-5 w-[70%] py-2 rounded-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProductDetails;

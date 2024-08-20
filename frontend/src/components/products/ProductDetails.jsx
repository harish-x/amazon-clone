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
    dispatch(AddCartItem({ _id, quantity })).then(unwrapResult).then(()=>toast.success("added to cart",{position:"bottom-center"}))
  }

  return (
    <>
      {error ? (
        <div>Product is not available</div>
      ) : status === "loading" ? (
        <Spinner />
      ) : status === "success" ? (
        <div className="bg-white">
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

            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  alt=""
                  src={product?.product?.images[0]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    alt=""
                    src={product?.product?.images[1]}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    alt=""
                    src={product?.product?.images[2]}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  alt=""
                  src={product?.product?.images[3]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product?.product?.name}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {product?.product?.price}
                </p>

                {/* Reviews */}
                {/* <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div> */}
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {product?.product?.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <ProductQuantity
                    stock={product.product.stock}
                    qunt={getQuantity}
                  />
                </div>
                {product.product.stock == 0 && (
                  <p className="text-red-800">Out of stock</p>
                )}
                <button
                  type="button"
                  disabled={product.product.stock == 0 ? true : false}
                  onClick={() => addtocart(product.product._id)}
                  className=" px-2 py-3 bg-amazonYellow"
                >
                  Add to cart
                </button>
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">
                      {product?.product?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProductDetails;

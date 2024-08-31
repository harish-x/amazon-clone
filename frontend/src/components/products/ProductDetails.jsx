import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../features/ProductFeature";
import { useParams } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import toast from "react-hot-toast";
import MetaData from "../MetaData";
import ProductQuantity from "./ProductQuantity";
import { AddCartItem } from "../../features/CartFeatures";
import { unwrapResult } from "@reduxjs/toolkit";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProduct(id));
    window.addEventListener("resize", setwidthfunc);
    return () => {
      window.removeEventListener("resize", setwidthfunc);
    };
  }, []);
  function setwidthfunc() {
    if (window.innerWidth < 570) {
      setScreenWidth(true);
    } else {
      setScreenWidth(false);
    }
  }
  const { product, status, error } = useSelector((state) => state.productState);
  const sliderRef = useRef(null);
  const goToSlide = (slideNumber) => {
    sliderRef.current.slickGoTo(slideNumber);
  };
  const [activeSlide, setActiveSlide] = useState(0);

  if (error !== null) {
    toast.error(error);
  }
  const [quantity, setQuantity] = useState();
  const [screenWidth, setScreenWidth] = useState(
    window.innerWidth > 570 ? false : true
  );

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
  var settings = {
    dots: screenWidth,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, next) => {
      setActiveSlide(next);
    },
  };

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
            <div className="mx-auto mt-10 max-w-2xl grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="">
                <Slider {...settings} ref={sliderRef}>
                  {Object.entries(product?.product?.images).map(([k, val]) => (
                    <div className="h-[500px]" key={k}>
                      <img
                        src={val.image}
                        className="object-contain h-full  mx-auto"
                        alt=""
                      />
                    </div>
                  ))}
                </Slider>
                {!screenWidth ? (
                  <div className="flex justify-between mt-2">
                    {Object.entries(product?.product?.images).map(
                      ([k, val]) => (
                        <div
                          className="h-[100px] w-[100px] border p-1 rounded flex"
                          style={{
                            border: activeSlide == k ? "solid 1px black" : null,
                          }}
                          key={k}
                        >
                          <img
                            src={val.image}
                            onMouseEnter={() => goToSlide(k)}
                            onClick={()=>goToSlide(k)}
                            style={{
                              opacity: activeSlide == k && "1",
                            }}
                            className="object-contain h-full cursor-pointer opacity-80  mx-auto"
                            alt=""
                          />
                        </div>
                      )
                    )}
                  </div>
                ) : null}
              </div>
              <div className="mt-20 md:my-auto flex justify-center w-full">
                <div className="items-center">
                  <p className="text-3xl py-4">{product.product.name}</p>
                  <p className="text-xl py-4">{product.product.description}</p>
                  {product.product.stock > 1 ? (
                    <p className="text-green-600 text-xl pt-4">In stock</p>
                  ) : (
                    <p className="text-red-600 text-xl py-4">Out of stock</p>
                  )}
                  <p className="text-xl py-2">
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
        </div>
      ) : null}
    </>
  );
};

export default ProductDetails;

import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../../features/ProductsFeatures";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import { categories } from "../../utils/constants";
import toast from "react-hot-toast";

const imgs = [
  "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
  "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
  "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
  "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
  "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-05.jpg",
  "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-06.jpg",
  "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-07.jpg",
  "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-08.jpg",
];

const ProductSearch = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { allproducts, productCount, resPerPage, error } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [fetchPrice, setFetchPrice] = useState([]);
  const [category, setCategory] = useState(null);

  if (error !== null) {
    toast.error(error, { position: "bottom-center" });
  }

  useEffect(() => {
    dispatch(getProducts({ keyword, currentPage, fetchPrice, category }));
  }, [currentPage, keyword, fetchPrice, category]);

  const setCurrentPagenum = (pageNo) => {
    setCurrentPage(pageNo);
    dispatch(getProducts(pageNo));
  };

  return (
    <section className="mt-[5%] mx-auto max-w-2xl py-5 px-4 xs:px-6 sm:max-w-7xl md:px-8">
      <h2 className="text-center text-3xl">{keyword}</h2>
      <div>
        <div className="py-10 block md:hidden">
          <button
            type="button"
            className="py-2 px-3  gap-x-2 text-start border bg-amazonYellow text-white text-sm font-medium rounded-lg shadow-sm  "
            aria-haspopup="dialog"
            aria-expanded={isSidebarOpen}
            aria-controls="sidebar"
            aria-label="Toggle navigation"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            Filter
          </button>
        </div>

        <div
          id="sidebar"
          className={`hs-overlay ${
            isSidebarOpen
              ? "hs-overlay-open:translate-x-0"
              : "-translate-x-full"
          } transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto `}
          role="dialog"
          aria-label="Sidebar"
        >
          <div className="w-full flex i justify-end">
            <button
              className="text-black "
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <img
                src="https://img.icons8.com/?size=100&id=3062&format=png&color=000000"
                alt=""
                className="w-10 mr-2"
              />
            </button>
          </div>

          <div className="p-6">
            <Slider
              range={true}
              marks={{ 1: "1₹", 1000: "₹1000" }}
              min={1}
              max={1000}
              dots={true}
              className="bg-gray border-x-emerald-950"
              defaultValue={price}
              onChange={(val) => setPrice(val)}
              handleRender={(renderProps) => (
                <Tooltip overlay={`₹ ${renderProps.props["aria-valuenow"]}`}>
                  {renderProps}
                </Tooltip>
              )}
            />
            <hr className="mt-3" />
            <button
              type="button"
              onClick={() => setFetchPrice(price)}
              className="bg-amazonYellow text-white px-2 rounded mt-6 p-2"
            >
              Filter
            </button>
            <div className="mt-3">
              <h3>Categories</h3>
              <ul>
                {categories.map((data, index) => (
                  <li
                    key={index}
                    className="py-1 cursor-pointer hover:text-amazonYellow"
                  >
                    {data}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <div className="px-5 hidden md:block  mx-5 mt-5">
          <Slider
            range={true}
            marks={{ 1: "1₹", 1000: "₹1000" }}
            min={1}
            max={1000}
            dots={true}
            className="bg-gray border-x-emerald-950"
            defaultValue={price}
            onChange={(val) => {
              setPrice(val);
            }}
            handleRender={(renderProps) => {
              return (
                <Tooltip overlay={`₹ ${renderProps.props["aria-valuenow"]}`}>
                  {renderProps}
                </Tooltip>
              );
            }}
          />
          <hr className="mt-3" />
          <button
            type="button"
            onClick={() => setFetchPrice(price)}
            className="bg-amazonYellow text-white px-2 rounded mt-6 p-2"
          >
            Filter
          </button>
          <div className="mt-3">
            <h3>Categories</h3>
            <ul>
              {categories.map((data, index) => (
                <li
                  key={index}
                  className="py-1 cursor-pointer hover:text-amazonYellow"
                  onClick={() => setCategory(data)}
                >
                  {data}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-16 xs:px-6 ss:py-24 sm:max-w-7xl md:px-8">
          <div className="grid grid-cols-1 gap-x-3 gap-y-5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-x-6">
            {allproducts?.message?.map((product, index) => (
              <Link key={index} to={`/product/${product._id}`}>
                <div className="group">
                  <div className="aspect-h-1 aspect-w-1 w-3/4 mx-auto overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      alt="ferf"
                      src={imgs[index]}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm mx-auto text-gray-700">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {productCount > 0 && productCount > resPerPage && (
        <div className="flex justify-center items-center mt-10">
          <Pagination
            activePage={currentPage}
            onChange={setCurrentPagenum}
            totalItemsCount={productCount}
            itemsCountPerPage={resPerPage}
            nextPageText={"Next"}
            firstPageText={"First"}
            lastPageText={"Last"}
          />
        </div>
      )}
    </section>
  );
};

export default ProductSearch;

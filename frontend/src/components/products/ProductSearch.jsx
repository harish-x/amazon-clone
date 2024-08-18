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
  const { allproducts, productCount, resPerPage,error } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [fetchPrice, setFetchPrice] = useState([]);
  const [category, setCategory] = useState(null);

  if (error !== null) {
    toast.error(error,{position:"bottom-center"})
  }

  useEffect(() => {
    dispatch(getProducts({ keyword, currentPage, fetchPrice,category }));
  }, [currentPage, keyword, fetchPrice,category]);

  const setCurrentPagenum = (pageNo) => {
    setCurrentPage(pageNo);
    dispatch(getProducts(pageNo));
  };

  return (
    <section className="mt-[5%] bg-white">
      <h2 className="text-center text-3xl">{keyword}</h2>
      <div>
        <div className="w-1/3 px-5 mt-5">
          <Slider
            range={true}
            marks={{ 1: "1$", 1000: "$1000" }}
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
                <Tooltip overlay={`$ ${renderProps.props["aria-valuenow"]}`}>
                  {renderProps}
                </Tooltip>
              );
            }}
          />
          <hr className="mt-3" />
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
          <button
            type="button"
            onClick={() => setFetchPrice(price)}
            className="bg-amazonYellow rounded mt-6 p-2"
          >
            Filter
          </button>
        </div>
        <div className="mx-auto max-w-2xl px-4 py-16 xs:px-6 ss:py-24 sm:max-w-7xl md:px-8">
          <div className="grid grid-cols-1 gap-x-3 gap-y-5 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:gap-x-6">
            {allproducts?.message?.map((product, index) => (
              <Link key={index} to={`/product/${product._id}`}>
                <div className="group">
                  <div className="aspect-h-1 aspect-w-1 w-3/4 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      alt="ferf"
                      src={imgs[index]}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </Link>
            ))}
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
      </div>
    </section>
  );
};

export default ProductSearch;

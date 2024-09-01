import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../features/ProductsFeatures";
import toast from "react-hot-toast";


const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ currentPage }));
  }, []);

  const { allproducts, productCount, resPerPage, error } = useSelector(
    (state) => state.productsState
  );
  if (error !== null) {
    toast.error(error, { position: "bottom-center" });
  }
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPagenum = (pageNo) => {
    setCurrentPage(pageNo);
    dispatch(getProducts({ pageNo }));
  };

  return (
    <section className="bg-gray-50">
      <div>
        <div className="mx-auto max-w-2xl mt-10 py-5 px-4 xs:px-6 sm:max-w-7xl md:px-8">
          <div
            className="grid grid-cols-1 gap-x-3 gap-y-5 xs:grid-cols-2
          sm:grid-cols-4 md:grid-cols-4 xl:gap-x-6 relative px-5 left-auto
          right-auto w-full gap-1"
          >
            {allproducts?.message?.map((product, index) => (
              <Link key={index} to={`/product/${product._id}`}>
                <div className="group h-72 bg-white p-5">
                  <div className="aspect-h-1 mx-auto aspect-w-1 w-3/4 h-3/4 overflow-hidden rounded-lg  xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      alt="ferf"
                      src={product.images[0].image}
                      className="h-full w-full object-contain object-center group-hover:opacity-75"
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
          <div className="flex justify-center py-3 items-center mt-8">
            <Pagination
              innerClass="bg-white inline-flex -space-x-px text-sm rounded"
              activeClass="bg-yellow-300 text-white px-2"
              itemClass="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
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

export default Products;

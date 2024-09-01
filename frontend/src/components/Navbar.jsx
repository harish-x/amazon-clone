import React, { useEffect, useState } from "react";
import { Navlist } from "../utils/constants";
import {
  amazon_cart,
  amazon_location,
  amazon_logo,
  empty_cart,
} from "../utils";
import Search from "./search/Search";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [screen, setScreen] = useState(window.innerWidth < 1060 ? false : true);
  const { items } = useSelector((state) => state.CartState);
  const { isAuthenticated, user } = useSelector((state) => state.AuthState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  function resizescreen() {
    if (window.innerWidth < 1060) {
      setScreen(false);
    } else {
      setScreen(true);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", resizescreen);
    return () => {
      window.removeEventListener("resize", resizescreen);
    };
  }, []);

  return (
    <section>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <nav className="bg-primary flex text-white px-5 font-amazon justify-around w-100 gap-4">
        <div className="img-div w-32 flex items-center justify-start">
          <Link to="/">
            <img src={amazon_logo} width="100%" className="" alt="" />
          </Link>
        </div>
        <div className="location_div items-center hidden md:flex">
          <div className="w-8">
            <img src={amazon_location} width="100%" alt="" />
          </div>
          <div>
            <p className="text-gray-400 text-xs">
              Delivering to Chennai 600094
            </p>
            <p className="text-sm font-bold">Update location</p>
          </div>
        </div>
        <div className="hidden ss:flex flex-grow ">
          <Search />
        </div>

        {screen ? (
          <div className="items-center justify-between hidden md:flex">
            <div className="flex items-center px-3">
              <img
                src="https://img.icons8.com/?size=100&id=32584&format=png&color=000000"
                alt=""
                className="w-12"
              />
              <span className="font-bold">EN</span>
            </div>
            <div className="account_div px-3 items-center">
              <div>
                <Link to="/myprofile">
                  <p className="text-xs">
                    Hello {isAuthenticated ? user[0].user.name : "sign in"},
                  </p>
                  <p className="text-sm font-bold">Account & Lists</p>
                </Link>
              </div>
            </div>
            <div className="account_div px-3 items-center">
              <div>
                <Link to="/myorders">
                  <p className="text-xs">Return,</p>
                  <p className="text-sm font-bold">& Orders</p>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden ss:flex flex-col-reverse justify-end items-center ">
            <span className="text-sm ss:text-base ">
              {isAuthenticated ? user[0].user.name : "sign in"}
            </span>
            <Link to="/myprofile">
              <img
                src="https://img.icons8.com/?size=50&id=ov6L0v2AmOuv&format=png&color=ffffff"
                alt=""
              />
            </Link>
          </div>
        )}
        {items.length < 1 ? (
          <Link to="/cart">
            <div className="cart_div w-16">
              <img src={empty_cart} alt="" />
            </div>
          </Link>
        ) : (
          <Link to="/cart">
            <div className="cart_div w-16 relative">
              <span className=" text-orange-500 absolute rounded-full p-1 top-[10%] left-[40%]">
                {items.length}
              </span>
              <img src={amazon_cart} alt="" />
            </div>
          </Link>
        )}
      </nav>
      <div className="flex ss:hidden px-5 py-2 bg-primary">
        <Search></Search>
      </div>
      <div className="bg-secondary scroll-container  overflow-auto whitespace-nowrap py-2 flex ">
        {screen ? (
          Navlist.map((data) => {
            return (
              <ul key={data} className="text-white font-semibold font-amazon mx-2 px-2 w-full">
                <li className="overflow-hidden ">{data}</li>
              </ul>
            );
          })
        ) : (
          <div className="flex mx-1 items-center text-white">
            <button
              type="button"
              className="w-6 mx-1 mr-2"
              onClick={toggleSidebar}
            >
              <img
                src="https://img.icons8.com/?size=100&id=8113&format=png&color=ffffff"
                className="object-contain w-full h-full"
                alt=""
              />
            </button>
            <p>Filter by</p>
            <ul className="flex mx-1">
              <li className="mx-1">Your Lists</li>
              <li className="mx-1">Deals</li>
              <li className="mx-1">Sell</li>
            </ul>
          </div>
        )}
      </div>
      {!screen && (
        <div>
          <div className="bg-white scroll-container  overflow-auto whitespace-nowrap py-2 flex sm:hidden">
            <div className="flex space-x-5 mx-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <img
                  src={`/assets/category/${i + 1}.jpg`}
                  alt=""
                  className="w-[50px]"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Navbar;

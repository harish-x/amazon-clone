import React, { useState } from "react";
import {Navlist} from '../utils/constants'
import {
  amazon_cart,
  amazon_location,
  amazon_logo,
  amazon_search,
  empty_cart,
} from "../utils";


const Navbar = () => {
  const [screen, setScreen] = useState(true);

  window.addEventListener("resize", () => {
    if (window.innerWidth < 1060) {
      setScreen(false);
    }
    return window.removeEventListener("resize");
  });
  return (
    <section>
      <nav className="bg-primary flex text-white px-5 font-amazon justify-around w-100 gap-4">
        <div className="img-div w-32 flex items-center justify-start">
          <img src={amazon_logo} width="100%" className="" alt="" />
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

        <div className=" items-center hidden ss:flex flex-grow">
          <div className="flex items-center w-full h-10">
            <div className="bg-gray-300 px-3 h-full flex rounded-l-md items-center">
              <span className="text-gray-700">All</span>
            </div>
            <div className="h-full flex-grow">
              <input
                type="text"
                className="h-full w-full px-2"
                placeholder="Search Amazon.in"
              />
            </div>
            <div className="w-8 bg-amazonYellow flex items-center h-full rounded-r-md">
              <img src={amazon_search} width="100%" alt="" />
            </div>
          </div>
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
                <p className="text-xs">Hello signin,</p>
                <p className="text-sm font-bold">Account & Lists</p>
              </div>
            </div>
            <div className="account_div px-3 items-center">
              <div>
                <p className="text-xs">Return,</p>
                <p className="text-sm font-bold">& Orders</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-end items-center">
            <span>Sign in </span>{" "}
            <img
              src="https://img.icons8.com/?size=50&id=ov6L0v2AmOuv&format=png&color=ffffff"
              alt=""
            />
          </div>
        )}

        <div className="cart_div w-16">
          <img src={empty_cart} alt="" />
        </div>
      </nav>
      <div className="bg-secondary scroll-container overflow-auto whitespace-nowrap py-2 flex  ">
        {Navlist.map((data) => {
          return (
            <ul className="text-white  px-2">
              <li>{data}</li>
            </ul>
          );
        })}
      </div>
    </section>
  );
};

export default Navbar;

import React, { useState } from "react";
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

const Navbar = () => {
  const [screen, setScreen] = useState(true);
  const { items } = useSelector((state) => state.CartState);
  const { isAuthenticated, user } = useSelector((state) => state.AuthState);

  window.addEventListener("resize", () => {
    if (window.innerWidth < 1060) {
      setScreen(false);
    } else {
      setScreen(true);
    }
  });
  return (
    <section>
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

        <Search />
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
          <div className="flex flex-col-reverse justify-end items-center">
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
      <div className="bg-secondary scroll-container  overflow-auto whitespace-nowrap py-2 hidden ss:flex ">
        {screen ? (
          Navlist.map((data) => {
            return (
              <ul key={data} className="text-white mx-1">
                <li className="overflow-hidden">{data}</li>
              </ul>
            );
          })
        ) : (
          <div className="flex mx-1 text-white">
            <p>Filter by</p>
            <ul className="flex mx-1">
              <li className="mx-1">Your Lists</li>
              <li className="mx-1">Deals</li>
              <li className="mx-1">Sell</li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Navbar;

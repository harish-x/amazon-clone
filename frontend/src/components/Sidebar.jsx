import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-64 bg-gray-800 text-white h-full transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div
        className="text-white text-xl mr-4 mt-3 flex justify-end items-end"
        onClick={toggleSidebar}
      >
        <img
          src="https://img.icons8.com/?size=100&id=3062&format=png&color=ffffff"
          className="w-8"
          alt=""
        />
      </div>

      <div className="mt-10">
        <Link to="/">
          <h3
            className="text-lg text-center font-semibold"
            onClick={toggleSidebar}
          >
            Amazon
          </h3>
        </Link>

        <div className="flex mt-10 space-y-5 flex-col w-full">
          <Link to="/myprofile">
            <button
              className="bg-gray-900 py-1  w-full"
              onClick={toggleSidebar}
            >
              Account
            </button>
          </Link>
          <Link to="/cart">
            <button className="bg-gray-900 py-1 w-full" onClick={toggleSidebar}>
              Cart
            </button>
          </Link>
          <Link to="/myorders">
            <button className="bg-gray-900 py-1 w-full" onClick={toggleSidebar}>
              Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

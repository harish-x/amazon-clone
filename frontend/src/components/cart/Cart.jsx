import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductQuantity from "../products/ProductQuantity";
import { removeItemFromCart } from "../../slices/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import { emptycartimg } from "../../utils";

const Cart = () => {
  const cartitems = useSelector((state) => state.CartState.items);
  const [quantity, setQuantity] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getQuantity = useCallback((data) => {
    setQuantity(data);
  });

  return (
    <>
      {cartitems.length >= 1 ? (
        <div className="w-full bg-gray-50 h-[100vh] relative overflow-y-auto">
          <div className="pb-16">
            {" "}
            <h2 className="text-2xl mt-5 text-center">
              {cartitems.length} item(s) in the cart
            </h2>
            {cartitems.map((data, index) => {
              return (
                <div
                  className="bg-white mx-auto max-w-2xl flex-col ss:flex-row flex items-center justify-between rounded mt-7 py-1 px-4 xs:px-6 sm:max-w-7xl md:px-24"
                  key={index}
                >
                  <div className="h-36">
                    <img
                      src={data.image}
                      className="object-contain w-full h-full"
                      alt={data.name}
                    />
                  </div>
                  <div>
                    <p className="font-semibold py-2">{data.name}</p>
                    <p className="py-2">&#8377; {data.price}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <ProductQuantity stock={data.stock} qunt={getQuantity} />
                    <button
                      type="button"
                      className="bg-red-600 px-3 py-1 rounded-full text-white mt-2"
                      onClick={() => dispatch(removeItemFromCart(data.product))}
                    >
                      delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sticky bottom-0">
            <div className=" bg-white mx-auto max-w-2xl flex flex-col rounded mt-7 py-1 px-4 xs:px-6 sm:max-w-7xl md:px-24">
              <div className="self-end flex flex-col">
                <h2 className="font-semibold self-center py-2">
                  Order summary
                </h2>
                <hr />
                <p className="py-3 self-end font-semibold px-3">
                  {cartitems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                  units
                </p>
                <p className="pb-3 self-end font-semibold px-3">
                  &#8377;
                  {cartitems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </p>
                <span className=" text-sm">
                  Shipping charges is free for products above font-semibold
                  &#8377; 500
                </span>
                <button
                  type="button"
                  onClick={() => navigate("/shipping")}
                  className="bg-amazonYellow text-white self-center w-full px-4 py-2 rounded mt-2"
                >
                  Proceed to Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[calc(100vh-7rem)] w-full flex items-center justify-center">
          <div className="">
            <h1 className="text-2xl text-center">Your cart is empty</h1>
              <img src={emptycartimg} className=" w-full h-full mt-2" alt="" />
              <Link to="/">
               <button className="w-full py-2 px-1 rounded-full text-white bg-amazonYellow mt-5">Shop now</button>
              </Link>
              <Link to='/login'>
              <p className="mt-3 text-center underline underline-offset-2 hover:text-amazonYellow">Sign in</p>
              </Link>

          </div>
        </div>
      )}
    </>
  );
};

export default Cart;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPriceInfo } from "../../slices/CartSlice";
import { useNavigate, Link } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, items: CartItems } = useSelector(
    (state) => state.CartState
  );
  const itemsPrice = CartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 500 ? 0 : 70;
  const taxprice = Number(0.18 * itemsPrice).toFixed(2);
  const totalPrice = Number(
    itemsPrice + shippingPrice + Number(taxprice)
  ).toFixed(2);
  const dispatch = useDispatch();
  const dispatchPrice = () => {
    dispatch(addPriceInfo({ itemsPrice, shippingPrice, taxprice, totalPrice }));
    navigate("/order/confirm/payment");
  };
  return (
    <div className="font-amazon py-10 bg-gray-50">
      <div className="pb-16">
        <div className="flex items-center justify-center w-full py-8 ">
          <ol className="flex items-center mb-10 whitespace-nowrap">
            <li className="inline-flex items-center">
              <Link
                className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                to="/shipping"
              >
                Add Details
              </Link>
              <svg
                className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200">
              Check out
              <svg
                className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li
              className="flex items-center text-sm text-gray-500 focus:outline-none  dark:text-neutral-500  "
              aria-current="page"
            >
              Payment
            </li>
          </ol>
        </div>

        {CartItems.map((data, index) => {
          return (
            <div
              className="bg-white mx-auto max-w-2xl flex items-center justify-between rounded mt-7 py-1 px-4 xs:px-6 sm:max-w-7xl md:px-24"
              key={index}
            >
              <div className="h-36">
                <img
                  src={
                    data.image
                  }
                  className="object-contain w-full h-full"
                  alt={data.name}
                />
              </div>
              <div>
                <p className="font-semibold py-2">{data.name}</p>
                <p className="py-2">&#8377; {data.price}</p>
              </div>
              <div className="flex flex-col items-center justify-center"></div>
            </div>
          );
        })}
      </div>
      <div
        className=" mx-auto max-w-2xl  flex items-center flex-col md:flex-row md:space-y-0 space-y-5 space-x-10  rounded mt-7 py-5 px-4 xs:px-6 sm:max-w-7xl md:px-24"
        style={{ backgroundColor: "#FCF5EE", border: "1px solid #FBD8B4" }}
      >
        <p className="font-bold justify-self-start">Delivery Address</p>
        {Object.entries(shippingInfo).map(([key, val], i) => {
          return (
            <div className="mx-auto flex " key={i}>
              <p className="font-bold">{key}: &nbsp;</p>
              <p>{val}</p>
            </div>
          );
        })}
      </div>
      <div className="bg-white mx-auto max-w-2xl flex items-center flex-col md:flex-row md:space-y-0 space-y-5 space-x-10 justify-between rounded mt-7 py-1 px-4 xs:px-6 sm:max-w-7xl md:px-24">
        <div>
          <p className="font-bold">Items and price:</p>
          <p>
            {CartItems.map((item, i) => (
              <div key={i}>{item.name} </div>
            ))}
          </p>
          <p> &#8377; {itemsPrice}</p>
        </div>
        <div>
          <p>
            {" "}
            <span className="font-bold">shipping charges :</span> &#8377;{" "}
            {shippingPrice} Rs
          </p>
        </div>
        <div>
          <p>
            {" "}
            <span className="font-bold">Tax 18% :</span> &#8377; {taxprice}
          </p>
        </div>
        <div>
          <p>
            <span className="font-bold">Total price: </span> &#8377;{" "}
            {totalPrice}
          </p>
        </div>
      </div>
      <div>
        <button
          onClick={dispatchPrice}
          type="button"
          className="bg-amazonYellow mx-auto max-w-2xl flex items-center justify-between rounded mt-7 py-1 px-4 xs:px-6 sm:max-w-7xl md:px-24"
        >
          Confirm order
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;

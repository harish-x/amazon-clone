import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShippingInfo } from "../../slices/CartSlice";
import { Link, useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.CartState);
  const [address, setAddress] = useState(shippingInfo.address ?? "");
  const [city, setCity] = useState(shippingInfo.city ?? "");
  const [phoneNo, setPhoneno] = useState(shippingInfo.phoneNo ?? "");
  const [country, setCountry] = useState(shippingInfo.country ?? "");
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode ?? "");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    console.log({ address, city, country, phoneNo, postalCode });
    dispatch(addShippingInfo({ address, city, country, phoneNo, postalCode }));
    navigate("/order/confirm");
  }
  return (
    <>
      <div className="w-full font-amazon bg-white h-[calc(100vh-10rem)] ">
        <div></div>
        <div className="flex h-full flex-col w-full items-center justify-center">
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
              className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200"
              aria-current="page"
            >
              Payment
            </li>
          </ol>
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className="my-3 text-2xl">Shipping Address</h1>
            <form
              className="flex flex-col bg-gray-50 py-8 rounded px-8 w-[100%] ss:w-[80%] sm:w-[40%]"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Address"
                className="block w-full my-2 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="phonenumber"
                className="block w-full my-2 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"
                value={phoneNo}
                onChange={(e) => setPhoneno(e.target.value)}
              />
              <input
                type="text"
                placeholder="Country"
                className="block w-full my-2 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
              />

              <input
                type="text"
                placeholder="city"
                className="block w-full my-2 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />

              <input
                type="text"
                placeholder="postal code"
                className="block w-full my-2 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-amazonYellow px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Address
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmOrder } from "../../features/OrderFeature";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const {
    items: orderItems,
    shippingInfo,
    priceInfo,
  } = useSelector((state) => state.CartState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function orderfunc() {
    dispatch(confirmOrder({ orderItems, shippingInfo, priceInfo }))
      .then(unwrapResult)
      .then(() => {
        toast.success("saved");
        navigate("/");
      })
      .catch(() => toast.error("error"));
  }

  return (
    <div className="w-full h-[calc(100vh-8rem)] ">
      <div className="flex flex-col space-x-3 space-y-3">
        <h1 className="text-2xl">Didn't integrate the payment gamtway yet!</h1>
        <button
          className="bg-amazonYellow px-3 py-2 rounded"
          onClick={orderfunc}
        >
          click to save your order
        </button>
      </div>
    </div>
  );
};

export default Payment;

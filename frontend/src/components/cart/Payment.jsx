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
 const navigate = useNavigate()
  const dispatch = useDispatch()
  function orderfunc() {
    dispatch(confirmOrder({ orderItems, shippingInfo, priceInfo })).then(unwrapResult).then(() => {
      toast.success("saved")
      navigate('/')
    }).catch(() => toast.error("error"))
    }
  
    
  return (
    <div>
      <h1>Didn't integrate the payment gamtway yet!</h1>
      <button className="bg-amazonYellow" onClick={orderfunc}>click to save your order</button>
    </div>
  );
};

export default Payment;

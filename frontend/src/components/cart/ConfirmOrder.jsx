import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPriceInfo } from "../../slices/CartSlice";
import {useNavigate} from 'react-router-dom'
const ConfirmOrder = () => {
  const navigate = useNavigate()
  const { shippingInfo, items: CartItems } = useSelector(
    (state) => state.CartState
  );
  const itemsPrice = CartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 500 ? 0 : 70;
  const taxprice = Number(0.18 * itemsPrice).toFixed(2);
    const totalPrice = Number(itemsPrice + shippingPrice + Number(taxprice)).toFixed(2);
    const dispatch = useDispatch()
    const dispatchPrice = () => {
      dispatch(addPriceInfo({ itemsPrice, shippingPrice, taxprice, totalPrice }))
      navigate("/order/confirm/payment");
    }
  return (
    <div>
      <div>
        {CartItems.map((data, i) => {
          return (
            <div className="bg-stone-500 mt-4" key={i}>
              {data.name}
              <br />
              <span>Rs.</span> {data.price}
              <p>{data.quantity}</p>
              <img src={data.image} alt={data.name} className="" />
            </div>
          );
        })}
      </div>
      <div>
        {Object.entries(shippingInfo).map(([key, val], i) => {
          return (
            <div key={i}>
              <p className="font-bold">{key}:</p>
              <p>{val}</p>
            </div>
          );
        })}
      </div>
      <div>
        <div>
          <p>price:</p>
          <p>
            {CartItems.map((item, i) => (
              <div key={i}>{item.name} +</div>
            ))}
          </p>
          <p>{itemsPrice}</p>
        </div>
        <div>
          <p>shipping charges {shippingPrice} Rs</p>
        </div>
        <div>
          <p>Tax 18% : {taxprice}</p>
        </div>
        <div>
          <p>Total price: {totalPrice}</p>
        </div>
      </div>
      <div>
        <button
          onClick={dispatchPrice}
          type="button"
          className="bg-amazonYellow"
        >
          Confirm order
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;

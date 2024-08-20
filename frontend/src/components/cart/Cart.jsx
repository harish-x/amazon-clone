import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductQuantity from "../products/ProductQuantity";
import { removeItemFromCart } from "../../slices/CartSlice";

const Cart = () => {
  const cartitems = useSelector((state) => state.CartState.items);
  const [quantity, setQuantity] = useState();
  const dispatch = useDispatch();

  const getQuantity = useCallback((data) => {
    setQuantity(data);
  });
  return (
    <>
      {cartitems.length >= 1 ? (
        <div>
          <h2>{cartitems.length} in the cart</h2>
          {cartitems.map((data, index) => {
            return (
              <div className="bg-stone-500 mt-4" key={index}>
                {data.name}
                <br />
                <span>Rs.</span> {data.price}
                <ProductQuantity stock={data.stock} qunt={getQuantity} />
                <img src={data.image} alt={data.name} className="" />
                <button
                  type="button"
                  className="bg-red-600"
                  onClick={() => dispatch(removeItemFromCart(data.product))}
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h1>Your cart is empty</h1>
        </div>
      )}
    </>
  );
};

export default Cart;

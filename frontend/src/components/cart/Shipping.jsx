import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShippingInfo } from "../../slices/CartSlice";
import { useNavigate } from "react-router-dom";

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
      <div>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="phonenumber"
                value={phoneNo}
                onChange={(e) => setPhoneno(e.target.value)}
              />
              <input
                type="text"
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
              />

              <input
                type="text"
                placeholder="city"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />

              <input
                type="text"
                placeholder="postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <button type="submit" className="bg-green-200">
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

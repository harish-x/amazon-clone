import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleOrder } from "../../features/OrderFeature";
import Spinner from "../spinner/Spinner";
const OrderDetails = () => {
  const { status, SingleOrder } = useSelector((state) => state.OrderState);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, []);
  console.log(JSON.stringify(SingleOrder));

  return (
    <div>
      {status === "success" ? (
        <div>
          {SingleOrder.map((orderObj, index) => {
            const order = orderObj.order;

            return (
              <div className="" key={index}>
                <h2 className="text-3xl text-center font-semibold mt-10 w-full">
                  Order Details
                </h2>
                <div className="bg-white mx-auto max-w-2xl flex flex-col items-start space-y-3 justify-between rounded mt-7 py-1 px-4 xs:px-6 sm:max-w-7xl md:px-24">
                  <p>
                    <strong>Order ID:</strong> {order._id}
                  </p>
                  <p>
                    <strong>Order Status:</strong> {order.orderStatus}
                  </p>
                  <p>
                    <strong>Total Price:</strong> &#8377; {order.totalPrice}
                  </p>
                  <p>
                    <strong>Ordered At: </strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>

                  <h3 className="font-bold border-b">Ordered Products</h3>
                  {order.orderItems.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex w-full items-center space-x-10"
                      style={{ marginBottom: "10px" }}
                    >
                      <div>
                        <img
                          src="https://m.media-amazon.com/images/I/714UFzp5O7L._SX679_.jpg"
                          alt={item.name}
                          style={{ width: "100px" }}
                        />
                      </div>
                      <div>
                        <p>
                          <strong>Product Name:</strong> {item.name}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {item.quantity}
                        </p>
                        <p>
                          <strong>Price:</strong> &#8377; {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white mx-auto max-w-2xl flex flex-col items-start space-y-3 justify-between rounded py-3] px-4 xs:px-6 sm:max-w-7xl md:px-24">
                  <h3 className="font-bold">Shipping Info</h3>
                  <p>
                    <strong>Name:</strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.user.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.shippingInfo.address}
                  </p>
                  <p>
                    <strong>Country:</strong> {order.shippingInfo.country}
                  </p>
                  <p>
                    <strong>City:</strong> {order.shippingInfo.city}
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {order.shippingInfo.phoneNo}
                  </p>
                  <p>
                    <strong>Postal Code:</strong>{" "}
                    {order.shippingInfo.postalCode}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default OrderDetails;

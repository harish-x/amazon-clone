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
              <div key={index}>
                <h2>Order Details</h2>
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>Order Status:</strong> {order.orderStatus}
                </p>
                <p>
                  <strong>Total Price:</strong> ${order.totalPrice}
                </p>
                <p>
                  <strong>Ordered At: </strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>

                <h3>Order Items</h3>
                {order.orderItems.map((item, itemIndex) => (
                  <div key={itemIndex} style={{ marginBottom: "10px" }}>
                    <p>
                      <strong>Product Name:</strong> {item.name}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Price:</strong> ${item.price}
                    </p>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100px" }}
                    />
                  </div>
                ))}

                <h3>Shipping Info</h3>
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
                  <strong>Postal Code:</strong> {order.shippingInfo.postalCode}
                </p>

                <h3>User Info</h3>
                <p>
                  <strong>Name:</strong> {order.user.name}
                </p>
                <p>
                  <strong>Email:</strong> {order.user.email}
                </p>
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

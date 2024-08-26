import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../features/OrderFeature";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";
const Myorders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(myOrders());
  }, []);
  const { status, orders: myorders } = useSelector((state) => state.OrderState);

  console.log(myorders);

  return (
    <div>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="">Orders</h1>
          <Link to="/detailorder/:id">
            {myorders &&
              myorders.length > 0 &&
              myorders[0].orders.map((order, orderIndex) => (
                <div className="bg-gray-300 mt-2" key={orderIndex}>
                  <p>Your order is {order.orderStatus}</p>
                  <Link to={`/detailorder/${order._id}`}>
                    {order.orderItems &&
                      order.orderItems.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <p>{item.name}</p>
                          <p>Price: {item.price}</p>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                      ))}
                  </Link>
                </div>
              ))}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Myorders;

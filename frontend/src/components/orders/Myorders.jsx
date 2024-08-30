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
        <div className="font-amazon">
          <h1 className="text-3xl text-center font-semibold mt-10 w-full">Your Orders</h1>
          <Link to="/detailorder/:id">
            {myorders &&
              myorders.length > 0 &&
              myorders[0].orders.map((order, orderIndex) => (
                <div
                  className="bg-white mx-auto max-w-2xl flex items-center rounded mt-7 py-1 px-4 xs:px-6 sm:max-w-7xl md:px-24"
                  key={orderIndex}
                >
                  <div>
                    <p className="text-green-400 flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div> <span className="ml-1">Your order is{" "}  {order.orderStatus}</span> 
                     
                    </p>
                    <Link to={`/detailorder/${order._id}`}>
                      {order.orderItems &&
                        order.orderItems.map((item, itemIndex) => (
                          <div key={itemIndex}>
                            <p> <span className="px-1">{ itemIndex+1}.</span>{item.name}</p>
                            <p className="px-1">Price: &#8377; {item.price}</p>
                            <p className="px-1">Quantity: {item.quantity}</p>
                          </div>
                        ))}
                    </Link>
                  </div>
                </div>
              ))}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Myorders;

const catchAsyncError = require("../middlewares/catchAsyncError");
const Order = require("../models/orderModel");
const Product = require("../models/ProductModels");
const ErrorHandler = require("../utils/errorHandler");

exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  console.log({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  });
  

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });
  res.status(200).json({
    success: true,
    order,
  });
});

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, order });
});

exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).populate(
    "user",
    "name email"
  );

  if (!orders) {
    return next(
      new ErrorHandler(`Order not found with this ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, orders });
});

//admin
exports.orders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({});
  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({ success: true, totalAmount, orders });
});

exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus == "Delivered") {
    return next(new ErrorHandler("order has been already delivered", 400));
  }
  order.orderItems.forEach(async (orderItem) => {
    await updateStock(orderItem.productId, orderItem.quantity);
  });
  order.orderStatus = req.body.orderStatus;
  order.deliveredAt = Date.now();
  await order.save();
  res.status(200).json({ success: true });
});

async function updateStock(productId, quantity) {
  const newproduct = await Product.findById(productId);
  newproduct.stock = newproduct.stock - quantity;
  newproduct.save({ validateBeforeSave: false });
}

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  try{
      await Order.findByIdAndDelete(req.params.id);
  }catch(err){
    return next(new ErrorHandler(err, 400));
  }
  res.status(200).json({success:true})
  
})

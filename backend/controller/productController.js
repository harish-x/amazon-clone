const ProductModel = require("../models/ProductModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/ApiFeatures");
const { Mongoose } = require("mongoose");

exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 2;
  const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
    .search()
    .filter()
    .paginate(resPerPage);
  const products = await apiFeatures.query;
  res
    .status(200)
    .json({ success: true, count: products.length, message: products });
});

exports.newProducts = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await ProductModel.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 400));
  }
  res.status(201).json({
    success: true,
    product,
  });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  }
  product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  }

  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "product deleted",
  });
});

//review

exports.createReview = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  const review = {
    user: req.body.id,
    rating,
    comment,
  };
  const product = await ProductModel.findById(productId);

  const isReviewed = product.reviews.find((review) => {
    return review.user.toString() == req.user.id.toString();
  });

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() == req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.reviews.length;
  product.ratings = isNaN(product.ratings) ? 0 : product.ratings;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.productId);
  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });
  const numOfReviews = reviews.length;
  let ratings =
    reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / reviews.length;

  ratings = isNaN(ratings) ? 0 : ratings;
  await ProductModel.findByIdAndUpdate(
    req.query.productId,
    {reviews,
    numOfReviews,
    ratings}
  );

  res.status(200).json({
    success: true,
  });
});

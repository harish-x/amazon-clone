const express = require("express");
const {
  getProducts,
  newProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReview,
} = require("../controller/productController");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

router.route("/products").get(getProducts);
router
  .route("/products/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProducts);
router
  .route("/product/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);
router
  .route("/review")
  .put(isAuthenticatedUser, createReview)
  .delete(deleteReview);

router.route("/reviews").get(getReviews);

module.exports = router;

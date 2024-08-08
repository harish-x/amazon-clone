const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter product name"],
    trim: true,
    maxLength: [100, "product name is too long"],
  },
  price: {
    type: Number,
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "enter product description"],
  },
  ratings: {
    type: String,
    default: 0,
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please enter product category"],
  },
  seller: {
    type: String,
    required: [true, "please enter seller details"],
  },
  stock: {
    type: Number,
    required: [true, "please enter products stock"],
    maxLength: [20, "product stock cannot exceeds 20"],
  },
  numOfReviews: {
    type: String,
    default: 0,
  },
  reviews: [
    {
      user: mongoose.Schema.Types.ObjectId,
      rating: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

let schema = mongoose.model("product", productSchema);
module.exports = schema;

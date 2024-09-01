const products = require("../data/moreproduct.json");
const product = require("../models/ProductModels");
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("../config/database");
dotenv.config({ path: path.join(__dirname, "..", "config", ".env") });

connectDatabase();
const seedProducts = async () => {
  try {
    await product.deleteMany();
    console.log("existing products deleted");
    await product.insertMany(products);
    console.log("all products added");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

seedProducts();

const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyparser = require("body-parser");
const connectDatabase = require("./config/database");
const products = require("./routes/product");
const errorMiddleware = require("./middlewares/error");
const auth = require("./routes/auth");
const order = require("./routes/order");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config({ path: path.join(__dirname, "config", ".env") });

connectDatabase();
app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});
app.use("/api/v1/", products);
app.use("/api/v1/", auth);
app.use("/api/v1", order);
app.use(errorMiddleware);
const server = app.listen(process.env.PORT, () => {
  console.log(`port is running on ${process.env.PORT}`);
});
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down the server due to unhandled rejection");
  server.close(() => {
    process.exit(1);
  });
});

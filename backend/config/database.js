const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URL, { dbName: "amazon" })
    .then(async () => {
      console.log(`mongo db is connected`);
    })
};

module.exports = connectDatabase;

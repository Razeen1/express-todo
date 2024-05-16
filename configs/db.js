const mongoose = require("mongoose");

mongoose
  .connect('mongodb://localhost:27017/testDatabase')
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log("DB connection is failed");
  });
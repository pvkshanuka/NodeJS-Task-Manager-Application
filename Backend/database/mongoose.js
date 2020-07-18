const mongoose = require("mongoose");
const { error } = require("console");

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://127.0.0.1:27017/taskmanager", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() => console.log("Database connected."))
  .catch((error) => console.log(error));

module.exports = mongoose;

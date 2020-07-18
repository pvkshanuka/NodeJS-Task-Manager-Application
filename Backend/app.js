const express = require("express");
const app = express();

const mongoose = require("./database/mongoose");
const List = require("./database/models/list");
const Task = require("./database/models/task");
const listController = require("./controllers/listController");
const taskController = require("./controllers/taskController");

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  res.header("Access-Control-Allow-Headers","Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});


app.use('/lists',listController);
app.use('/tasks',taskController);



app.listen(3000, () => {
  console.log("Server started on port : 3000");
});

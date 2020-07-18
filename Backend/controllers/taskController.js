const express = require("express");
var router = express.Router();

const Task = require("../database/models/task");
const { error } = require("console");

router.get("/", (req, resp) => {
  Task.find({})
    .then((tasks) => resp.send(tasks))
    .catch((error) => console.log(error));
});

router.post("/:listId", (req, resp) => {
  new Task({ title: req.body.title, _listId: req.params.listId })
    .save()
    .then((task) => resp.send(task))
    .catch((error) => console.log(error));
});

router.get("/:taskId", (req, resp) => {
  Task.find({ _id: req.params.taskId })
    .then((task) => resp.send(task))
    .catch((error) => console.log(error));
});

router.patch("/:taskId", (req, resp) => {
  Task.findOneAndUpdate({ _id: req.params.taskId }, { $set: req.body })
    .then((task) => resp.send(task))
    .catch((error) => console.log(error));
});

router.delete("/:taskId", (req, resp) => {
  Task.findByIdAndDelete(req.params.taskId)
    .then((task) => resp.send(task))
    .catch((error) => console.log(error));
});
module.exports = router;

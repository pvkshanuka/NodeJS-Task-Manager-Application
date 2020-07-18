const express = require("express");
var router = express.Router();

const List = require("../database/models/list");
const Task = require("../database/models/task");
const { error } = require("console");

router.get("/", (req, resp) => {
  List.find({})
    .then((lists) => resp.send(lists))
    .catch((error) => console.log(error));
});

router.post("/", (req, resp) => {
  new List({ title: req.body.title })
    .save()
    .then((list) => resp.send(list))
    .catch((error) => console.log(error));
});

router.get("/:listId", (req, resp) => {
  List.find({ _id: req.params.listId })
    .then((list) => resp.send(list))
    .catch((error) => console.log(error));
});

router.patch("/:listId", (req, resp) => {
  List.findOneAndUpdate({ _id: req.params.listId }, { $set: req.body })
    .then((list) => resp.send(list))
    .catch((error) => console.log(error));
});

router.delete("/:listId", (req, resp) => {
  const deleteTasks = (list) => {
    Task.deleteMany({ _listId: list._id })
      .then(() => list)
      .catch((error) => console.log(error));
  };
  List.findByIdAndDelete(req.params.listId)
    .then((list) => resp.send(deleteTasks(list)))
    .catch((error) => console.log(error));
});

module.exports = router;

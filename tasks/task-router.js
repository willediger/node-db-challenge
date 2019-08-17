const express = require("express");
const db = require("./task-model.js");

const router = express.Router();

// - `GET /api/tasks/`: all tasks
router.get("/", async (req, res, next) => {
  let tasks = await db.get();
  if (tasks) {
    tasks = tasks.map(p => {
      return { ...p, completed: p.completed ? true : false };
    });
    res.status(200).json(tasks);
  } else {
    next({
      status: 500,
      message: "The tasks could not be retrieved."
    });
  }
});

module.exports = router;

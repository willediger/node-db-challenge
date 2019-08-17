const express = require("express");

const resourceRouter = require("./resources/resource-router.js");
const projectRouter = require("./projects/project-router.js");
const taskRouter = require("./tasks/task-router.js");

const server = express();

server.use(express.json());
server.use(logger);

server.use("/api/resources", resourceRouter);
server.use("/api/projects", projectRouter);
server.use("/api/tasks", taskRouter);

server.use(errHandler);

function errHandler(err, req, res, next) {
  res.status(err.status).json({ message: err.message });
}

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

module.exports = server;

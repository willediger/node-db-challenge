const express = require("express");
const db = require("./project-model.js");

const router = express.Router();

// - `GET /api/projects/`: all projects
router.get("/", async (req, res, next) => {
  let projects = await db.get();
  if (projects) {
    projects = projects.map(p => {
      return { ...p, completed: p.completed ? true : false };
    });
    res.status(200).json(projects);
  } else {
    next({
      status: 500,
      message: "The projects could not be retrieved."
    });
  }
});

router.post("/", validateProject, async (req, res, next) => {
  const project = await db.insert(req.body);
  if (project) {
    res.status(200).json(project);
  } else {
    next({
      status: 500,
      message: "The project could not be added."
    });
  }
});

router.post(
  "/:id/tasks",
  validateProjectId,
  validateTask,
  async (req, res, next) => {
    let task = await db.insertTask(req.project.id, req.body);
    if (task) {
      task = task.map;
      res.status(200).json(task);
    } else {
      next({
        status: 500,
        message: "The task could not be added."
      });
    }
  }
);

async function validateProjectId(req, res, next) {
  try {
    const { id } = req.params;
    const project = await db.get(id);
    if (project) {
      req.project = project;
      next();
    } else {
      next({
        status: 404,
        message: "The project with the specified ID does not exist."
      });
    }
  } catch {
    next({
      status: 500,
      message: "The project information could not be retrieved."
    });
  }
}

function validateProject(req, res, next) {
  console.log(req.body);
  if (req.body && Object.keys(req.body).length > 0) {
    if (
      req.body.hasOwnProperty("name") &&
      req.body.hasOwnProperty("completed")
    ) {
      next();
    } else {
      next({
        status: 400,
        message: "missing name or completion status"
      });
    }
  } else {
    next({
      status: 400,
      message: "missing project data"
    });
  }
}

function validateTask(req, res, next) {
  console.log(req.body);
  if (req.body && Object.keys(req.body).length > 0) {
    if (
      req.body.hasOwnProperty("description") &&
      req.body.hasOwnProperty("completed")
    ) {
      next();
    } else {
      next({
        status: 400,
        message: "missing description or completion status"
      });
    }
  } else {
    next({
      status: 400,
      message: "missing task data"
    });
  }
}

module.exports = router;

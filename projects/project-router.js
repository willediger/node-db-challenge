const express = require("express");
const db = require("./project-model.js");

const router = express.Router();

// - `GET /api/projects/`: all projects
router.get("/", async (req, res, next) => {
  const projects = await db.get();
  if (projects) {
    res.status(200).json(projects);
  } else {
    next({
      status: 500,
      message: "The projects could not be retrieved."
    });
  }
});

router.post("/", validatProject, async (req, res, next) => {
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

async function validateProjectId(req, res, next) {
  try {
    const { id } = req.params;
    const project = await db.getProject(id);
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

function validatProject(req, res, next) {
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

module.exports = router;

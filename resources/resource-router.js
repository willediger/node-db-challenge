const express = require("express");
const db = require("./resource-model.js");

const router = express.Router();

// - `GET /api/resources/`: all resources
router.get("/", async (req, res, next) => {
  const resources = await db.get();
  if (resources) {
    res.status(200).json(resources);
  } else {
    next({
      status: 500,
      message: "The resources could not be retrieved."
    });
  }
});

router.post("/", validatResource, async (req, res, next) => {
  const resource = await db.insert(req.body);
  if (resource) {
    res.status(200).json(resource);
  } else {
    next({
      status: 500,
      message: "The resource could not be added."
    });
  }
});

async function validateResourceId(req, res, next) {
  try {
    const { id } = req.params;
    const resource = await db.getResource(id);
    if (resource) {
      req.resource = resource;
      next();
    } else {
      next({
        status: 404,
        message: "The resource with the specified ID does not exist."
      });
    }
  } catch {
    next({
      status: 500,
      message: "The resource information could not be retrieved."
    });
  }
}

function validatResource(req, res, next) {
  if (req.body && Object.keys(req.body).length > 0) {
    if (req.body.name) {
      next();
    } else {
      next({
        status: 400,
        message: "missing name"
      });
    }
  } else {
    next({
      status: 400,
      message: "missing resource data"
    });
  }
}

module.exports = router;

const express = require('express');
const db = require('./projectsModel.js');
const mapper = require('./mapper');
const { validateProjectBody } = require('./mapper');
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allProjects = await db.getProjects();
    res.json(allProjects);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const project = await db.getProjects(req.params.id);
    const projectResorces = await db.findResources(req.params.id);
    res.json({"project": project, "resources": projectResorces});
  } catch (error) {
    next(error);
  }
});

router.get("/:id/resources", async (req, res, next) => {
  try {
    const projectResorces = await db.findResources(req.params.id);
    res.json(projectResorces);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateProjectBody, async (req, res, next) => {
  try {
    const newProject = await db.insert(req.body);
    res.json(newProject);
  } catch (error) {
    next(error);
  }
});

  module.exports = router;
const express = require("express");
const router = express.Router();
const libreria = require("../services/libreria");


router.get("/", async function (req, res, next) {
  try {
    res.json(await libreria.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting libreria `, err.message);
    next(err);
  }
});


router.get("/:id", async function (req, res, next) {
  try {
    res.json(await libreria.getSingle(req.params.id));
  } catch (err) {
    console.error(`Error while getting libreria`, err.message);
    next(err);
  }
});


router.post("/", async function (req, res, next) {
  try {
    res.json(await libreria.create(req.body));
  } catch (err) {
    console.error(`Error while creating libreria`, err.message);
    next(err);
  }
});


router.put("/:id", async function (req, res, next) {
  try {
    res.json(await libreria.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating libreria`, err.message);
    next(err);
  }
});


router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await libreria.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting libreria`, err.message);
    next(err);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const exampleController = require("../controllers/exampleController");

router.get("/", exampleController.getAllExamples);
router.post("/", exampleController.createExample);

module.exports = router;

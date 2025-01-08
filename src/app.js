const express = require("express");
const bodyParser = require("body-parser");
const exampleRoutes = require("./routes/exampleRoutes");

require("dotenv").config(); // Load environment variables

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/examples", exampleRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

module.exports = app;

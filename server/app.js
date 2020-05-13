const bodyParser = require("body-parser");
const express = require("express");
require("express-async-errors");

const app = express();

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  if (err.message) {
    res.status(500).json({
      message: `${err}`,
    });
  }
  next(err);
});

app.run = () => app.listen(3001, () => {
  console.info("Server is running");
});

module.exports = app;

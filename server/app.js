const bodyParser = require("body-parser");
const express = require("express");
const { stripeSK } = require("./config");
const stripe = require("stripe")(stripeSK);
require("express-async-errors");
require("./services/mongoose");
const auth = require("./controllers/auth");
const connect = require("./controllers/connect");
const app = express();
app.use(bodyParser.json());

app.use("/api/auth/", auth);
app.use("/api/connect", connect);

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

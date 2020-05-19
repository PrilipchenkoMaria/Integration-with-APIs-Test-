const bodyParser = require("body-parser");
const express = require("express");
const { resolve } = require("path");
require("express-async-errors");
require("./services/mongoose");
const auth = require("./controllers/auth");
const connect = require("./controllers/connect");
const product = require("./controllers/product");
const app = express();
app.use(bodyParser.json());

app.use("/api/auth/", auth);
app.use("/api/connect", connect);
app.use("/api/product", product);

app.use("/", express.static(resolve(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(resolve(__dirname, "../client/build/index.html"));
});

app.use((err, req, res, next) => {
  if (err.message) {
    res.status(500).json({
      message: `${err}`,
    });
  }
  next(err);
});

const { PORT = 3001 } = process.env;
app.run = () => app.listen(PORT, () => {
  console.info("Server is running", PORT);
});

module.exports = app;

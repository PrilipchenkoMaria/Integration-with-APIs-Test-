const mongoose = require("mongoose");
const { dbConfig } = require("../config");
require("../models");

mongoose.connection
  .on("error", (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(-1);
}).on("open", () => console.info("MongoDB connected"));

mongoose.connect(dbConfig.url, { useUnifiedTopology: true, useNewUrlParser: true } );

module.exports = mongoose;

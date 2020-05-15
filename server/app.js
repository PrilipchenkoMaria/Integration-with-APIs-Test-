const bodyParser = require("body-parser");
const express = require("express");
const { stripeSK } = require("./config");
const stripe = require("stripe")(stripeSK);
require("express-async-errors");
require("./services/mongoose");

const app = express();
app.use(bodyParser.json());

app.use("/api/connect/oauth/", async (req, res) => {
  const { code } = req.query;

  stripe.oauth.token({
    grant_type: "authorization_code",
    code,
  }).then(
    (response) => {
      const { stripe_user_id } = response;
      saveAccountId(stripe_user_id);
      return res.status(200).json({ success: true });
    },
    (err) => {
      if (err.type === "StripeInvalidGrantError") {
        return res.sendStatus(400).json({ error: "Invalid authorization code: " + code });
      } else {
        return res.status(500).json({ error: "An unknown error occurred." });
      }
    },
  );
});

const saveAccountId = (id) => {
  // todo: Save the connected account ID from the response to database.
  console.log("Connected account ID: " + id);
};

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

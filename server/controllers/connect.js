const router = require("express").Router();
const { stripeSK } = require("../config");
const stripe = require("stripe")(stripeSK);
const {
  saveStripeId,
  getIdByToken,
} = require("../services/user");

router.use("/oauth", stripeAuth);

async function stripeAuth(req, res) {
  const { code } = req.query;
  const authString = req.headers.authorization;
  const userId = await getIdByToken(authString);
  stripe.oauth.token({
    grant_type: "authorization_code",
    code,
  }).then(
    async (response) => {
      const { stripe_user_id } = response;
      await saveStripeId(stripe_user_id, userId);
      return res.status(200).json({ success: true });
    },
    (err) => {
      if (err.type === "StripeInvalidGrantError") {
        return res.status(400).json({ error: "Invalid authorization code: " + code });
      } else {
        return res.status(500).json({ error: "An unknown error occurred." });
      }
    },
  );
}

module.exports = router;

const router = require("express").Router();
const { stripeSK } = require("../config");
const stripe = require("stripe")(stripeSK);
const {
  saveStripeId,
  getIdByToken,
} = require("../services/user");
const { findStripeAccById } = require("../services/product");

router.use("/oauth", stripeAuth);
router.use("/payment-intent", paymentIntent);

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

async function paymentIntent(req, res) {
  const { _id, amount } = req.body;
  if (!_id || !amount) return res.status(400).json();
  const destination = await findStripeAccById(_id);
  const clientSecret = await stripe.paymentIntents.create({
    payment_method_types: ["card"],
    amount,
    currency: "usd",
    transfer_data: {
      destination,
    },
  }).then((res) => res.client_secret);
  if (clientSecret) {
    return res.status(200).json({
      clientSecret,
    });
  }
}

module.exports = router;

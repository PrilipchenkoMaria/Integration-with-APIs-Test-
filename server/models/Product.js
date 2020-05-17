const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  stripeId: {
    type: String,
    required: [true, "Stripe id is required"],
  },
  stripe_account: String,
});

module.exports = mongoose.model("Product", ProductSchema);

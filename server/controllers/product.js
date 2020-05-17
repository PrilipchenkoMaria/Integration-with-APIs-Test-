const router = require("express").Router();
const {
  getStripeIdById,
  getIdByToken,
} = require("../services/user");
const { createProduct } = require("../services/product");

router.post("/createProduct", addProduct);

async function addProduct(req, res) {
  const authString = req.headers.authorization;
  const userId = await getIdByToken(authString);
  const { name, amount } = req.body;
  if (!name || !amount || !authString) {
    return res.sendStatus(400);
  }
  const stripeId = await getStripeIdById(userId);
  const newProduct = await createProduct(name, amount, stripeId);
  if (newProduct) return res.sendStatus(201);
}

module.exports = router;

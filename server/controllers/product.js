const router = require("express").Router();
const {
  getStripeIdById,
  getIdByToken,
} = require("../services/user");
const {
  createProduct,
  findAllProducts,
} = require("../services/product");

router.post("/create-product", addProduct);
router.get("/all", getProducts);

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

async function getProducts(req, res) {
  const products = await findAllProducts();
  return res.status(200).json(products);
}

module.exports = router;

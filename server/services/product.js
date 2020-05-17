const Product = require("mongoose").model("Product");

module.exports = {
  createProduct,
};

async function createProduct(name, amount, stripeId) {
  return await Product.create({
    name,
    amount,
    stripeId,
  });
}

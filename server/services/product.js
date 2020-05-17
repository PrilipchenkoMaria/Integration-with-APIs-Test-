const Product = require("mongoose").model("Product");

module.exports = {
  createProduct,
  findAllProducts,
};

async function createProduct(name, amount, stripeId) {
  return await Product.create({
    name,
    amount,
    stripeId,
  });
}

async function findAllProducts() {
  return Product.find({});
}

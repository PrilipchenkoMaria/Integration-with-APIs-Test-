const Product = require("mongoose").model("Product");

module.exports = {
  createProduct,
  findAllProducts,
  findStripeAccById,
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

async function findStripeAccById(_id) {
  const product = await Product.findOne({ _id });
  return product.stripeId;
}

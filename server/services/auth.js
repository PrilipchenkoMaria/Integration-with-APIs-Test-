const User = require("mongoose").model("User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { secret } = require("../config");

module.exports = {
  createUser,
  checkUserByEmail,
  signToken,
  verifyUser,
  getIdByToken,
  saveStripeId,
};

async function checkUserByEmail(email) {
  return User.findOne({ email });
}

async function createUser(username, email, password) {
  const hashPassword = await hashPass(password);
  return await User.create({
    username,
    email,
    password: hashPassword,
  });
}

async function hashPass(password) {
  return bcrypt.hash(password, 11);
}

async function verifyUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) return false;
  const isPassCorrect = await checkPass(password, user.password);
  return isPassCorrect ? user._id : false;
}

async function saveStripeId(stripe_user_id, userId) {
  return await User.updateOne({ _id: userId }, { stripe_account: stripe_user_id });
}

async function signToken(id) {
  return jwt.sign({ id }, secret);
}

async function checkPass(password, hash) {
  return bcrypt.compare(password, hash);
}

async function getIdByToken(authString) {
  const token = authString && authString.substring(7);
  return await decodeToken(token);
}

async function decodeToken(token) {
  const verifyToken = jwt.verify(token, secret, (err, decoded) => decoded);
  return (verifyToken !== undefined ? verifyToken.id : false);
}

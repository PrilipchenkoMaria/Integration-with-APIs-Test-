const User = require("mongoose").model("User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { secret } = require("../config");

module.exports = {
  createUser,
  checkUserByEmail,
  signToken,
  verifyUser,
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

async function verifyUser( email, password) {
  const user = await User.findOne({ email });
  if (!user) return false;
  const isPassCorrect = await checkPass(password, user.password);
  return isPassCorrect ? user._id : false;
}

async function signToken(id) {
  return jwt.sign({ id }, secret);
}

async function checkPass(password, hash) {
  return bcrypt.compare(password, hash);
}


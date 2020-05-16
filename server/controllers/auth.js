const router = require("express").Router();
const { checkUserByEmail, signToken, createUser, verifyUser } = require("../services/auth");

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);

async function signUp(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Invalid payload",
    });
  }
  const existingUser = await checkUserByEmail(email);
  if (existingUser) {
    return res.status(200).json({
      message: "This email already taken",
    });
  }
  const newUser = await createUser(username, email, password);
  const token = await signToken(newUser._id);
  return res.status(201).json({
    token,
  });
}

async function signIn(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Invalid payload",
    });
  }
  const existingUser = await checkUserByEmail(email);
  if (!existingUser) {
    return res.status(403).json({
      message: "Incorrect email",
    });
  }
  const user = await verifyUser(email, password);
  if (!user) {
    return res.status(403).json({
      message: "Incorrect password",
    });
  }
  const token = await signToken(user._id);
  return res.status(200).json({
    message: "Authentication successful!",
    token,
  });
}

module.exports = router;

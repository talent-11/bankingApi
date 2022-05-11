require("dotenv").config();
const jwt = require("jsonwebtoken");
const messages = require("../utils/messages.util");

module.exports = function (req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(400).send({ error: messages.NO_TOKEN });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ error: err });
  }
};
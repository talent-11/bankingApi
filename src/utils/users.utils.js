require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
}

module.exports = {
  generateToken,
}
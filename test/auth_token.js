const jwt = require("jsonwebtoken");
const token = jwt.sign(
  { type: "USER", user: { id: 2 }, userId: 2 },
  process.env.JWT_KEY,
);

module.exports = token;

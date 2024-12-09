const jwt = require("jsonwebtoken");
const { loginUser } = require("../services/auth.service");

module.exports = {
  loginUser: async function (req, resp) {
    const { username, password } = req.body;
    const user = await loginUser(username, password);
    if (user) {
      const result = { type: "USER", user: user, userId: user.id };
      return resp.send({
        ...result,
        token: jwt.sign(result, process.env.JWT_KEY),
      });
    }
    resp.status(400).send({ error: "Username/Password incorrect" });
  },
};

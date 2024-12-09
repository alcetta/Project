var jwt = require("jsonwebtoken");

module.exports = {
  auth: async function (req, resp, next) {
    let { authorization } = req.headers;
    if (authorization) {
      authorization = authorization + "";
      if (authorization.startsWith("Bearer ")) {
        authorization = authorization.replace("Bearer ", "");
      }
      try {
        let user = jwt.verify(authorization, process.env.JWT_KEY);
        req.user = user.user;
        req.userId = user.user.id;
        next();
        return;
      } catch (e) {
        resp.status(400).send({ error: "JWT Error" });
      }
    }
    resp.status(403).send({ error: "Authentication required" });
  },
};

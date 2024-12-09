const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = {
  loginUser: async function (username, password) {
    const user = await User.findOne({ where: { username } });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return user;
    return null;
  },
};

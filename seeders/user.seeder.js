const { User } = require("../models");

module.exports = async () => {
  await User.create({
    name: "Alcetta1",
    username: "alcetta1",
    password: "123451",
  });
  await User.create({
    name: "Alcetta2",
    username: "alcetta2",
    password: "123452",
  });
  await User.create({
    name: "Alcetta3",
    username: "alcetta3",
    password: "123453",
  });
};

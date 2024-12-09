const { check } = require("express-validator");
const validator = require("./validator");
const userService = require("../services/user.service");

module.exports = {
  validateUser: function () {
    return [
      check("name")
        .notEmpty()
        .withMessage("name required")
        .isString()
        .withMessage("name must be string"),
      check("username")
        .notEmpty()
        .withMessage("username required")
        .isString()
        .withMessage("username must be string")
        .custom(async (input, { req }) => {
          const { User } = require("../models");
          const user = await User.findOne({ where: { username: input } });
          if (user && user.id != req.params.id)
            throw Error("username does not exist}");
          return true;
        })
        .withMessage("username exists"),
      check("password")
        .notEmpty()
        .withMessage("password required")
        .isString()
        .withMessage("password must be string"),
      validator(),
    ];
  },
  validateUserOwnership: function () {
    return [
      check("id")
        .isInt()
        .withMessage("Invalid id")
        .custom(async (id, { req }) => {
          let user = await userService.getUser(id);
          if (!user) throw Error("User not found");
          if (user.id != req.userId) throw Error("You are not the owner");
          return true;
        }),
      validator(),
    ];
  },
};

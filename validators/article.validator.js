const { check } = require("express-validator");
const validator = require("./validator");
const articleService = require("../services/article.service");
const userService = require("../services/user.service");

module.exports = {
  validateArticle: function () {
    return [
      check("title")
        .notEmpty()
        .withMessage("title required")
        .isString()
        .withMessage("title must be string"),
      check("content")
        .notEmpty()
        .withMessage("content required")
        .isString()
        .withMessage("content must be string"),
      check("on_date").notEmpty().withMessage("on_date required"),
      validator(),
    ];
  },
  validateArticleOwnership: function () {
    return [
      check("id")
        .isInt()
        .withMessage("Invalid id")
        .custom(async (id, { req }) => {
          let article = await articleService.getArticle(id);
          if (!article) throw Error("Article not found");
          if (article.userId != req.userId)
            throw Error("You are not the owner");
          return true;
        }),
      validator(),
    ];
  },
};

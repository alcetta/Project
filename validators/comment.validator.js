const { check } = require("express-validator");
const validator = require("./validator");
const commentService = require("../services/comment.service");
const articleService = require("../services/article.service");
const userService = require("../services/user.service");

module.exports = {
  validateComment: function () {
    return [
      check("content")
        .notEmpty()
        .withMessage("content required")
        .isString()
        .withMessage("content must be string"),
      check("articleId")
        .custom(async (input) => {
          const article = await articleService.getArticle(input);
          if (!article) throw Error("article does not exist}");
          return true;
        })
        .withMessage("article does not exists"),
      validator(),
    ];
  },
  validateCommentOwnership: function () {
    return [
      check("id")
        .isInt()
        .withMessage("Invalid id")
        .custom(async (id, { req }) => {
          let comment = await commentService.getComment(id);
          if (!comment) throw Error("Comment not found");
          if (comment.userId != req.userId)
            throw Error("You are not the owner");
          return true;
        }),
      validator(),
    ];
  },
};

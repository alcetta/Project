const { Comment } = require("../models");

module.exports = async () => {
  await Comment.create({
    content: "Test Comment1",
    articleId: 1,
    userId: 1,
  });
  await Comment.create({
    content: "Test Comment2",
    articleId: 2,
    userId: 2,
  });
  await Comment.create({
    content: "Test Comment3",
    articleId: 2,
    userId: 2,
  });
};

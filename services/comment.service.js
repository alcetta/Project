const { Comment, Article, User } = require("../models");

module.exports = {
  createComment: async function (comment) {
    return await Comment.create(comment);
  },
  getComment: async function (id) {
    return await Comment.findByPk(id, {
      model: Comment,
      include: [
        { model: Article, include: [{ model: User, include: [] }] },
        { model: User, include: [] },
      ],
    });
  },
  deleteComment: async function (id) {
    await Comment.destroy({
      where: {
        id,
      },
    });
  },
  updateComment: async function (id, comment) {
    return await Comment.update(comment, {
      where: {
        id,
      },
    });
  },
};

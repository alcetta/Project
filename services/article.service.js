const { Article, User, Comment } = require("../models");

module.exports = {
  createArticle: async function (article) {
    return await Article.create(article);
  },
  getAllArticle: async function () {
    return await Article.findAll({ include: [{ model: User }] });
  },
  getArticle: async function (id) {
    return await Article.findByPk(id, {
      model: Article,
      include: [
        { model: User, include: [] },
        {
          model: Comment,
          include: [
            { model: Article, include: [{ model: User, include: [] }] },
            { model: User, include: [] },
          ],
        },
      ],
    });
  },
  deleteArticle: async function (id) {
    await Article.destroy({
      where: {
        id,
      },
    });
  },
  updateArticle: async function (id, article) {
    return await Article.update(article, {
      where: {
        id,
      },
    });
  },
};

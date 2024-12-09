const { User, Article, Comment } = require("../models");

module.exports = {
  createUser: async function (user) {
    return await User.create(user);
  },
  getUser: async function (id) {
    return await User.findByPk(id, {
      model: User,
      include: [
        { model: Article, include: [{ model: User, include: [] }] },
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
  updateUser: async function (id, user) {
    return await User.update(user, {
      where: {
        id,
      },
    });
  },
};

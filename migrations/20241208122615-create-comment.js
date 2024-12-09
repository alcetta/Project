"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("comment", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.STRING,
      },
      articleId: {
        type: Sequelize.INTEGER,
        /*references: {
            model: 'Article',
            key: 'id',
        },*/
      },
      userId: {
        type: Sequelize.INTEGER,
        /*references: {
            model: 'User',
            key: 'id',
        },*/
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Comment");
  },
};

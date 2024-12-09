const { Article } = require("../models");

module.exports = async () => {
  await Article.create({
    title: "Test Article1",
    content: "This is a test article1",
    on_date: "2024-12-11",
    userId: 1,
  });
  await Article.create({
    title: "Test Article2",
    content: "This is a test article2",
    on_date: "2024-12-12",
    userId: 2,
  });
  await Article.create({
    title: "Test Article3",
    content: "This is a test article3",
    on_date: "2024-12-13",
    userId: 2,
  });
};

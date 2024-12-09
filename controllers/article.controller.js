const {
  createArticle,
  getAllArticle,
  getArticle,
  deleteArticle,
  updateArticle,
} = require("../services/article.service");

module.exports = {
  createArticle: async function (req, resp) {
    const { title, content, on_date } = req.body;
    const userId = req.userId;
    const article = { title, content, on_date, userId };
    const newArticle = await createArticle(article);
    resp.send({ message: "Article Created", data: newArticle }).status(201);
  },
  getAllArticle: async function (req, resp) {
    const allArticle = await getAllArticle();
    resp.send({ message: "All Article", data: allArticle });
  },
  getArticle: async function (req, resp) {
    const id = req.params.id;
    const article = await getArticle(id);
    resp.send({ message: "Article", data: article });
  },
  deleteArticle: async function (req, resp) {
    const id = req.params.id;
    await deleteArticle(id);
    resp.send({ message: "Article Deleted" });
  },
  updateArticle: async function (req, resp) {
    const id = req.params.id;
    const { title, content, on_date } = req.body;
    const article = { title, content, on_date };
    const newArticle = await updateArticle(id, article);
    resp.send({ message: "Article Updated", data: newArticle }).status(201);
  },
};

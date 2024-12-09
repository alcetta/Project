const {
  createComment,
  deleteComment,
  updateComment,
} = require("../services/comment.service");

module.exports = {
  createComment: async function (req, resp) {
    const { content, articleId } = req.body;
    const userId = req.userId;
    const comment = { content, articleId, userId };
    const newComment = await createComment(comment);
    resp.send({ message: "Comment Created", data: newComment }).status(201);
  },
  deleteComment: async function (req, resp) {
    const id = req.params.id;
    await deleteComment(id);
    resp.send({ message: "Comment Deleted" });
  },
  updateComment: async function (req, resp) {
    const id = req.params.id;
    const { content, articleId } = req.body;
    const comment = { content, articleId };
    const newComment = await updateComment(id, comment);
    resp.send({ message: "Comment Updated", data: newComment }).status(201);
  },
};

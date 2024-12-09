const { Router } = require("express");
const {
  createComment,
  deleteComment,
  updateComment,
} = require("../controllers/comment.controller");
const {
  validateComment,
  validateCommentOwnership,
} = require("../validators/comment.validator");
const { auth } = require("../middlewares/auth.middleware");

const commentRouter = Router();

/**
 * @swagger
 * /comment/:
 *  post:
 *   summary: Create new comment
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            content:
 *              type: string
 *              description: Content
 *              example: Test Comment
 *            articleId:
 *              type: integer
 *              description: Article
 *              example: 1
 *   responses:
 *      201:
 *       description: Comment created
 *      400:
 *       description: Error in request
 *      403:
 *       description: Must login
 */
commentRouter.post("/", auth, validateComment(), createComment);
/**
 * @swagger
 * /comment/{id}:
 *  delete:
 *   summary: Delete a comment
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the comment to delete
 *       schema:
 *         type: integer
 *         example: 1
 *   security:
 *    - bearerAuth: []
 *   responses:
 *      201:
 *       description: Comment created
 *      400:
 *       description: Error in request
 *      403:
 *       description: Must login
 */
commentRouter.delete("/:id", auth, validateCommentOwnership(), deleteComment);
/**
 * @swagger
 * /comment/{id}:
 *  put:
 *   summary: Update a comment
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the comment to update
 *       schema:
 *         type: integer
 *         example: 1
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            content:
 *              type: string
 *              description: Content
 *              example: Test Comment
 *   responses:
 *      201:
 *       description: Comment created
 *      400:
 *       description: Error in request
 *      403:
 *       description: Must login
 */
commentRouter.put(
  "/:id",
  auth,
  validateCommentOwnership(),
  validateComment(),
  updateComment,
);

module.exports = commentRouter;

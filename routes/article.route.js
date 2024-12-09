const { Router } = require("express");
const {
  createArticle,
  getAllArticle,
  getArticle,
  deleteArticle,
  updateArticle,
} = require("../controllers/article.controller");
const {
  validateArticle,
  validateArticleOwnership,
} = require("../validators/article.validator");
const { auth } = require("../middlewares/auth.middleware");

const articleRouter = Router();

/**
 * @swagger
 * /article/:
 *  post:
 *   summary: Create new article
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *              description: Title
 *              example: Test Article
 *            content:
 *              type: string
 *              description: Content
 *              example: This is a test article
 *            on_date:
 *              type: string
 *              description: On_Date
 *              example: 2024-12-1
 *   responses:
 *      201:
 *       description: Article created
 *      400:
 *       description: Error in request
 *      403:
 *       description: Must login
 */
articleRouter.post("/", auth, validateArticle(), createArticle);
/**
 * @swagger
 * /article/:
 *  get:
 *    summary: Get all article
 *    responses:
 *      201:
 *       description: Article created
 *      400:
 *       description: Error in request
 */
articleRouter.get("/", getAllArticle);
/**
 * @swagger
 * /article/{id}:
 *  get:
 *   summary: Get specific article
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the article
 *       schema:
 *         type: integer
 *         example: 1
 *   responses:
 *      201:
 *       description: Article created
 *      400:
 *       description: Error in request
 */
articleRouter.get("/:id", getArticle);
/**
 * @swagger
 * /article/{id}:
 *  delete:
 *   summary: Delete a article
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the article to delete
 *       schema:
 *         type: integer
 *         example: 1
 *   security:
 *    - bearerAuth: []
 *   responses:
 *      201:
 *       description: Article created
 *      400:
 *       description: Error in request
 *      403:
 *       description: Must login
 */
articleRouter.delete("/:id", auth, validateArticleOwnership(), deleteArticle);
/**
 * @swagger
 * /article/{id}:
 *  put:
 *   summary: Update a article
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the article to update
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
 *            title:
 *              type: string
 *              description: Title
 *              example: Test Article
 *            content:
 *              type: string
 *              description: Content
 *              example: This is a test article
 *            on_date:
 *              type: string
 *              description: On_Date
 *              example: 2024-12-1
 *   responses:
 *      201:
 *       description: Article created
 *      400:
 *       description: Error in request
 *      403:
 *       description: Must login
 */
articleRouter.put(
  "/:id",
  auth,
  validateArticleOwnership(),
  validateArticle(),
  updateArticle,
);

module.exports = articleRouter;

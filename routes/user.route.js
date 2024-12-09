const { Router } = require("express");
const { createUser, updateUser } = require("../controllers/user.controller");
const {
  validateUser,
  validateUserOwnership,
} = require("../validators/user.validator");
const { auth } = require("../middlewares/auth.middleware");

const userRouter = Router();

/**
 * @swagger
 * /user/:
 *  post:
 *   summary: Create new user
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: Name
 *              example: Alcetta
 *            username:
 *              type: string
 *              description: Username
 *              example: alcetta
 *            password:
 *              type: string
 *              description: Password
 *              example: 12345
 *   responses:
 *      201:
 *       description: User created
 *      400:
 *       description: Error in request
 */
userRouter.post("/", validateUser(), createUser);
/**
 * @swagger
 * /user/{id}:
 *  put:
 *   summary: Update a user
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the user to update
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
 *            name:
 *              type: string
 *              description: Name
 *              example: Alcetta
 *            username:
 *              type: string
 *              description: Username
 *              example: alcetta
 *            password:
 *              type: string
 *              description: Password
 *              example: 12345
 *   responses:
 *      201:
 *       description: User created
 *      400:
 *       description: Error in request
 *      403:
 *       description: Must login
 */
userRouter.put(
  "/:id",
  auth,
  validateUserOwnership(),
  validateUser(),
  updateUser,
);

module.exports = userRouter;

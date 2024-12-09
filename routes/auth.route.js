const { Router } = require("express");
const { loginUser } = require("../controllers/auth.controller");

const authRouter = Router();

/**
 * @swagger
 * /auth/user/:
 *  post:
 *   summary: Login into the system
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *              description: Username
 *              example: user
 *            password:
 *              type: string
 *              description: Password
 *              example: pass
 *   responses:
 *      200:
 *       description: Login successful
 *       content:
 *         schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              description: JWT token
 *      400:
 *       description: Incorrect username or password
 */
authRouter.post("/user", loginUser);

module.exports = authRouter;

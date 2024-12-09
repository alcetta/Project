const { Router } = require("express");
const userRouter = require("./user.route");
const articleRouter = require("./article.route");
const commentRouter = require("./comment.route");
const authRouter = require("./auth.route");

const router = Router();
router.use("/user", userRouter);
router.use("/article", articleRouter);
router.use("/comment", commentRouter);
router.use("/auth", authRouter);

module.exports = router;

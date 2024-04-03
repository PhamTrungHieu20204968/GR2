const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/CommentsController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/:blogId", validateToken, commentsController.createComment);
module.exports = router;

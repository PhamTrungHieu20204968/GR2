const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/CommentsController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/:blogId", validateToken, commentsController.createComment);
router.get("/:id", commentsController.getCommentChild);
router.delete("/:id", validateToken, commentsController.deleteComment);
router.put("/:id", validateToken, commentsController.updateComment);
module.exports = router;

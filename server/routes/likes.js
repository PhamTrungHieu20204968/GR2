const express = require("express");
const router = express.Router();
const likesController = require("../controllers/LikesController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, likesController.createLike);
router.delete("/blog/:id", validateToken, likesController.deleteBlogLike);
router.delete("/comment/:id", validateToken, likesController.deleteCommentLike);
module.exports = router;

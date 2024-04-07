const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/BlogsController");
const { validateToken } = require("../middlewares/AuthMiddleware");
const uploadCloud = require("../middlewares/Uploader");

router.post(
  "/",
  uploadCloud.array("image"),
  validateToken,
  blogsController.createBlog
);
router.get("/", blogsController.getAllBlogs);
router.delete("/:id", validateToken, blogsController.deleteBlog);
module.exports = router;

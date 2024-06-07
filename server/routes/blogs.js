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
router.put("/unsafe-blog/:id", validateToken, blogsController.updateUnsafeBlog);
router.put(
  "/:id",
  uploadCloud.array("image"),
  validateToken,
  blogsController.updateBlog
);
router.get("/admin", validateToken, blogsController.getUnsafeBlogs);
router.get("/:id", blogsController.getBlog);
router.get("/", blogsController.getAllBlogs);
router.delete("/:id", validateToken, blogsController.deleteBlog);
module.exports = router;

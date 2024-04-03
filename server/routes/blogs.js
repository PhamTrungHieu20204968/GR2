const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/BlogsController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, blogsController.createBlog);
router.get("/", blogsController.getAllBlogs);
router.delete('/:id',blogsController.deleteBlog);
module.exports = router;

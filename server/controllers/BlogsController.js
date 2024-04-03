const { blogs, users, likes, comments } = require("../models");
const { Op } = require("sequelize");
class BlogsController {
  // [GET] /
  async getAllBlogs(req, res, next) {
    try {
      const list = await blogs.findAll({
        include: [
          {
            model: users,
            attributes: ["name", "avatar"],
          },
          {
            model: comments,
            include: [
              {
                model: users,
                attributes: ["name", "avatar"],
              },
            ],
          },
          {
            model: likes,
            attributes: ["blogId", "userId"],
          },
        ],
        order: [["createdAt", "DESC"]],
        limit: 10,
      });
      res.json(list);
    } catch (error) {
      console.log(error);
      res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  //[POST] /
  async createBlog(req, res, next) {
    const blog = req.body;
    const userId = req.user.id;
    try {
      await blogs.create({
        ...blog,
        userId,
      });
      res.json("Tạo thành công");
    } catch (error) {
      console.log(error);
      res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  // [DELETE] /:id
  async deleteBlog(req, res) {
    const id = parseInt(req.params.id);
    try {
      await blogs.destroy({ where: { id } });
      res.json("Xóa thành công");
    } catch (error) {
      console.log(error);
      res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }
}

module.exports = new BlogsController();

const { Op } = require("sequelize");
const { blogs, users, likes, comments, images } = require("../models");
const cloudinary = require("cloudinary").v2;
class BlogsController {
  // [GET] /
  async getAllBlogs(req, res, next) {
    try {
      const list = await blogs.findAll({
        where: {
          status: {
            [Op.gt]: 0,
          },
        },
        include: [
          {
            model: users,
            attributes: ["name", "avatar"],
          },
          {
            model: images,
            attributes: ["url", "id"],
          },
          {
            model: comments,
            include: [
              {
                model: users,
                attributes: ["name", "avatar"],
              },
              {
                model: likes,
                attributes: ["commentId", "userId"],
                as: "CommentId",
              },
            ],
            order: [["createdAt", "DESC"]],
          },
          {
            model: likes,
            attributes: ["blogId", "userId"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      return res.json(list);
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  // [GET] /admin
  async getUnsafeBlogs(req, res, next) {
    if (req.user.role < 2) {
      return res.json({
        error: "Bạn không đủ quyền thực hiện chức năng này!",
      });
    }
    try {
      const list = await blogs.findAll({
        where: {
          status: 0,
        },
        include: [
          {
            model: users,
            attributes: ["name", "avatar"],
          },
          {
            model: images,
            attributes: ["url", "id"],
          },
          {
            model: comments,
            include: [
              {
                model: users,
                attributes: ["name", "avatar"],
              },
              {
                model: likes,
                attributes: ["commentId", "userId"],
                as: "CommentId",
              },
            ],
            order: [["createdAt", "DESC"]],
          },
          {
            model: likes,
            attributes: ["blogId", "userId"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      return res.json(list);
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  //[POST] /
  async createBlog(req, res, next) {
    const fileData = req.files;
    const blog = req.body;
    const userId = req.user.id;
    try {
      const _blog = await blogs.create({
        ...blog,
        userId,
      });

      if (fileData) {
        fileData.map(async (item) => {
          await images.create({
            url: item.path,
            blogId: _blog.id,
          });
        });
      }
      return res.json("Tạo thành công");
    } catch (error) {
      console.log(error);
      if (fileData) {
        fileData.map(async (item) => {
          await cloudinary.uploader.destroy(item.filename);
        });
      }
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  // [GET] /:id
  async getBlog(req, res) {
    const id = parseInt(req.params.id);
    try {
      const blog = await blogs.findOne({
        where: { id },
        include: [
          {
            model: users,
            attributes: ["name", "avatar"],
          },
          {
            model: images,
            attributes: ["url", "id"],
          },
          {
            model: comments,
            include: [
              {
                model: users,
                attributes: ["name", "avatar"],
              },
              {
                model: likes,
                attributes: ["commentId", "userId"],
                as: "CommentId",
              },
            ],
            order: [["createdAt", "DESC"]],
          },
          {
            model: likes,
            attributes: ["blogId", "userId"],
          },
        ],
      });
      return res.json(blog);
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  // [PUT] /:id
  async updateBlog(req, res) {
    const id = parseInt(req.params.id);
    const fileData = req.files;
    const userId = req.user.id;
    const values = req.body;
    try {
      const _blog = await blogs.findOne({ where: { id } });
      if (req.user.role < 2 && userId !== _blog.userId) {
        return res.json({
          error: "Bạn không đủ quyền thực hiện chức năng này!",
        });
      }
      const uploadedImage = values.uploadedImage
        .toString()
        .split(",")
        .map((item) => parseInt(item));
      await _blog.update({ ...values });
      await images.destroy({
        where: {
          id: {
            [Op.notIn]: uploadedImage,
          },
          blogId: id,
        },
      });
      if (fileData) {
        fileData.map(async (item) => {
          await images.create({
            url: item.path,
            blogId: _blog.id,
          });
        });
      }
      return res.json("Tạo thành công");
    } catch (error) {
      console.log(error);
      if (fileData) {
        fileData.map(async (item) => {
          await cloudinary.uploader.destroy(item.filename);
        });
      }
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  // [PUT] /unsafe-blog/:id
  async updateUnsafeBlog(req, res) {
    const id = parseInt(req.params.id);
    const values = req.body;
    if (req.user.role < 2) {
      return res.json({
        error: "Bạn không đủ quyền thực hiện chức năng này!",
      });
    }
    try {
      await blogs.update({ ...values }, { where: { id } });
      return res.json("Thành công");
    } catch (error) {
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  // [DELETE] /:id
  async deleteBlog(req, res) {
    const id = parseInt(req.params.id);
    const userId = req.user.id;
    try {
      const _blog = await blogs.findOne({ where: { id } });
      if (req.user.role < 2 && userId !== _blog.userId) {
        return res.json({
          error: "Bạn không đủ quyền thực hiện chức năng này!",
        });
      }
      await _blog.destroy();
      return res.json("Xóa thành công");
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }
}

module.exports = new BlogsController();

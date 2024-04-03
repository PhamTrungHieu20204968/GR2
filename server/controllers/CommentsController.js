const { blogs, users, likes, comments } = require("../models");
const { Op } = require("sequelize");
class CommentsController {
  //[POST] /blogId
  async createComment(req, res, next) {
    const userId = req.user.id;
    const blogId = parseInt(req.params.blogId);
    const { content, parent = 0, edited = 0 } = req.body;
    try {
      await comments.create({
        content,
        parent,
        edited,
        userId,
        blogId,
      });
      res.json("Tạo thành công");
    } catch (error) {
      console.log(error);
      res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }
  // [DELETE] /blog/:id
  //   async deleteBlogLike(req, res) {
  //     const id = parseInt(req.params.id);
  //     const userId = req.user.id;
  //     try {
  //       await likes.destroy({ where: { blogId: id, userId } });
  //       res.json("Xóa thành công");
  //     } catch (error) {
  //       console.log(error);
  //       res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
  //     }
  //   }
}

module.exports = new CommentsController();

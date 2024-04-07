const { blogs, users, likes, comments } = require("../models");
const { Op, where } = require("sequelize");
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
      return res.json("Tạo thành công");
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  // /:id
  async getCommentChild(req, res, next) {
    const id = parseInt(req.params.id);
    try {
      const list = await comments.findAll({
        where: { parent: id },
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
      });
      return res.json(list);
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  // [PUT] /:id
  async updateComment(req, res) {
    const id = parseInt(req.params.id);
    const comment = req.body;
    try {
      await comments.update(
        {
          ...comment,
        },
        { where: { id } }
      );
      return res.json("Cập nhật thành công");
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  // [DELETE] /:id
  async deleteComment(req, res) {
    const id = parseInt(req.params.id);
    const userId = req.user.id;
    try {
      const _comment = await comments.findOne({ where: { id } });
      if (req.user.role < 2 && userId !== _comment.userId) {
        return res.json({
          error: "Bạn không đủ quyền thực hiện chức năng này!",
        });
      }
      await _comment.destroy();
      return res.json("Xóa thành công");
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }
}

module.exports = new CommentsController();

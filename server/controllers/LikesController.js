const { likes } = require("../models");
class LikesController {
  //[POST] /
  async createLike(req, res, next) {
    const userId = req.user.id;
    const id = req.body;
    try {
      await likes.create({
        ...id,
        userId,
      });
      return res.json("Tạo thành công");
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }
  // [DELETE] /blog/:id
  async deleteBlogLike(req, res) {
    const id = parseInt(req.params.id);
    const userId = req.user.id;
    try {
      await likes.destroy({ where: { blogId: id, userId } });
      return res.json("Xóa thành công");
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  // [DELETE] /comment/:id
  async deleteCommentLike(req, res) {
    const id = parseInt(req.params.id);
    const userId = req.user.id;
    try {
      await likes.destroy({ where: { commentId: id, userId } });
      return res.json("Xóa thành công");
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }
}

module.exports = new LikesController();

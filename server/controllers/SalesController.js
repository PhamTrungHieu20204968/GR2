const { sales, users } = require("../models");
class SalesController {
  // [GET] /
  async getUserSale(req, res) {
    const userId = req.user.id;
    try {
      const list = await sales.findAll({
        where: { userId },
      });
      return res.json(list);
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  // [POST] /
  async createSale(req, res) {
    const userId = req.user.id;
    const { percent, point } = req.body;
    try {
      await sales.create({
        percent,
        userId,
      });
      if (point) {
        await users.update({ point }, { where: { id: userId } });
      }
      return res.json("Tạo thành công");
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }
}

module.exports = new SalesController();

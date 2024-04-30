const { notifications, users } = require("../models");
class NotificationsController {
  //[GET] /
  async getUserNotifications(req, res) {
    const userId = req.user.id;
    try {
      const list = await notifications.findAll({
        where: { receiverId: userId },
        include: [
          {
            model: users,
            attributes: ["name", "avatar"],
            as: "Sender",
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

  // [PUT] /
  async updateSeenNotification(req, res) {
    const userId = req.user.id;
    try {
      await notifications.update(
        { status: 1 },
        { where: { receiverId: userId } }
      );
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  // [POST] /
  async createNotification(req, res) {
    const userId = req.user.id;
    const values = req.body;
    try {
      if (values.receiverId === userId) {
        await notifications.findOrCreate({
          where: { ...values, type: 1 },
          defaults: {
            ...values,
          },
        });
      }
      return res.json("Tạo thành công");
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }
}

module.exports = new NotificationsController();

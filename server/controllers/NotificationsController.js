const { notifications, users } = require("../models");
const { Op } = require("sequelize");

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
      return res.json("Thành công!");
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  // [PUT] /:id
  async updateNotification(req, res) {
    const id = parseInt(req.params.id);
    const userId = req.user.id;
    if (req.user.role < 2 && req.user.id !== userId) {
      return res.json({
        error: "Bạn không đủ quyền thực hiện chức năng này!",
      });
    }
    const values = req.body;
    try {
      await notifications.update({ ...values }, { where: { id } });
      return res.json("Thành công!");
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  async updateScheduleNotifications(req, res) {
    const userId = req.user.id;
    const ids = req.body;
    try {
      await notifications.update(
        { type: 3 },
        { where: { receiverId: userId } }
      );
      return res.json("Thành công!");
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

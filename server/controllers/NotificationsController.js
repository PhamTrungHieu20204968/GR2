const {
  notifications,
  users,
  orders,
  orderItems,
  products,
} = require("../models");
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

  // [GET] /remind
  async getUserRemind(req, res) {
    const userId = req.user.id;
    try {
      const list = await notifications.findAll({
        where: { receiverId: userId, type: 0 },
        include: [
          {
            model: orders,
            include: [
              {
                model: orderItems,
                include: [
                  {
                    model: products,
                    attributes: ["name", "price"],
                  },
                ],
              },
            ],
          },
        ],
        order: [["sendTime"]],
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

  // [PUT] /schedule-notifications
  async updateScheduleNotifications(req, res) {
    const userId = req.user.id;
    const ids = req.body;
    try {
      await notifications.update(
        { type: 3 },
        { where: { receiverId: userId, id: ids } }
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

  // [DELETE] /:id
  async deleteNotification(req, res) {
    const id = parseInt(req.params.id);
    try {
      const _notification = await notifications.findOne({
        where: { id },
        include: [
          {
            model: orders,
            include: [
              {
                model: orderItems,
              },
            ],
          },
        ],
      });

      if (!_notification.repeatTime.includes("*")) {
        await _notification.destroy();
        return res.json("Thành công!");
      }
      
      if (!_notification) {
        return res.json("Thông báo không tồn tại!");
      } else {
        await notifications.destroy({ where: { id } });
      }

      const newOrder = await orders.create({
        address: _notification.order.address,
        fullName: _notification.order.fullName,
        city: _notification.order.city,
        telephone: _notification.order.telephone,
        email: _notification.order.email,
        totalMoney: _notification.order.totalMoney,
        type: _notification.order.type,
        userId: _notification.order.userId,
        status: _notification.order.status,
      });

      _notification.order.orderItems.map(async (item) => {
        await orderItems.create({
          quantity: item.quantity,
          productId: item.productId,
          orderId: newOrder.id,
        });
      });

      const newNotification = await notifications.create({
        sendTime: _notification.repeatTime,
        repeatTime: _notification.repeatTime,
        type: 0,
        status: 0,
        orderId: newOrder.id,
        receiverId: _notification.receiverId,
        content: _notification.content,
      });

      return res.json({ notification: newNotification, order: newOrder });
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  //[DELETE] /remind/:orderId
  async deleteRemind(req, res) {
    const orderId = parseInt(req.params.orderId);
    try {
      await orders.destroy({ where: { id: orderId } });
      return res.json("Thành công!");
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }
}

module.exports = new NotificationsController();

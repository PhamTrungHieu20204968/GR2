const {
  orders,
  orderItems,
  rates,
  products,
  users,
  sales,
  notifications,
} = require("../models");
const { Op } = require("sequelize");
class OrdersController {
  // [GET] /
  async getAllOrders(req, res) {
    if (req.user.role < 2) {
      return res.json({ error: "Không có quyền truy cập!" });
    }
    try {
      const List = await orders.findAll({
        where: { type: { [Op.gt]: 0 } },
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
      });
      return res.json(List);
    } catch (error) {
      console.log(error);
      return res.status(403).json({ error });
    }
  }

  // [GET] /user
  async getUserOrder(req, res) {
    try {
      const List = await orders.findAll({
        where: { userId: req.user.id, type: { [Op.gt]: 0 } },
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
      });
      return res.json(List);
    } catch (error) {
      console.log(error);
      return res.status(403).json({ error });
    }
  }

  // [PUT] /:id
  async updateOrder(req, res) {
    if (req.user.role < 2) {
      return res.json({ error: "Không có quyền truy cập!" });
    }
    const {
      address,
      fullName,
      city,
      telephone,
      email,
      totalMoney,
      type,
      status,
      cart,
      userId,
    } = req.body;
    const id = parseInt(req.params.id);
    try {
      await orders.update(
        {
          address,
          fullName,
          city,
          telephone,
          email,
          totalMoney,
          type,
          status,
        },
        { where: { id } }
      );
      if (userId && status === 3) {
        cart.map(async (item) => {
          await rates.update(
            {
              status: 1,
            },
            {
              where: {
                userId,
                productId: item.productId,
              },
            }
          );
        });
      }
      return res.status(200).json("Thành công");
    } catch (error) {
      console.log(error);
      return res.status(403).json({ error });
    }
  }

  // [POST] /
  async guestCreateOrder(req, res) {
    const {
      address,
      fullName,
      city,
      telephone,
      email,
      totalMoney,
      type,
      status,
    } = req.body.data;
    try {
      await orders.create({
        address,
        fullName,
        city,
        telephone,
        email,
        totalMoney,
        type,
        status,
      });

      cart.map(async (item) => {
        await orderItems.create({
          quantity: item.orderQuantity,
          productId: item.id,
          orderId: _order.id,
        });
      });

      return res.status(200).json("Tạo thành công");
    } catch (error) {
      console.log(error);
      return res.status(403).json({ error });
    }
  }

  // [POST] /user
  async userCreateOrder(req, res) {
    const {
      address,
      fullName,
      city,
      telephone,
      email,
      totalMoney,
      type,
      status,
      cart,
      point,
      voucher,
      sendTime,
    } = req.body;
    const userId = req.user.id;
    try {
      const _order = await orders.create({
        address,
        fullName,
        city,
        telephone,
        email,
        totalMoney,
        type,
        userId,
        status,
      });

      if (cart) {
        cart.map(async (item) => {
          await orderItems.create({
            quantity: item.orderQuantity,
            productId: item.id,
            orderId: _order.id,
          });
          await rates.findOrCreate({
            where: { productId: item.id, userId },
            defaults: {
              rate: 0,
              status: 0,
            },
          });
        });
      }

      if (voucher) {
        const _voucher = await sales.findOne({
          where: { userId, percent: voucher },
        });

        if (_voucher.quantity === 1) {
          _voucher.destroy();
        } else _voucher.update({ quantity: _voucher.quantity - 1 });
      }
      if (type > 0) {
        await users.update(
          { address, city, telephone, email, name: fullName, point },
          { where: { id: userId } }
        );
      }
      let notification;
      if (sendTime) {
        notification = await notifications.create({
          sendTime,
          repeatTime: sendTime,
          type: 0,
          status: 0,
          orderId: _order.id,
          receiverId: userId,
          content: "Bạn có lời nhắc đặt hàng",
        });
      }
      return res
        .status(200)
        .json(
          notification ? { notification, order: _order } : "Tạo thành công"
        );
    } catch (error) {
      console.log(error);
      return res.status(403).json({ error });
    }
  }
}

module.exports = new OrdersController();

const { orders } = require("../models");

class OrdersController {
  // [GET] /
  async getAllOrders(req, res) {
    if (req.user.role < 2) {
      return res.json({ error: "Không có quyền truy cập!" });
    }
    try {
      const List = await orders.findAll();
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
    } = req.body;
    const userId = req.user.id;
    try {
      await orders.create({
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

      return res.status(200).json("Tạo thành công");
    } catch (error) {
      console.log(error);
      return res.status(403).json({ error });
    }
  }
}

module.exports = new OrdersController();

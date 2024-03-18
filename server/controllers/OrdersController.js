const { orders } = require("../models");

class OrdersController {
  // [POST] /
  async guestCreateOrder(req, res) {
    const { address, fullName, city, telephone, email, totalMoney, type } =
      req.body.data;
    try {
      await orders.create({
        address,
        fullName,
        city,
        telephone,
        email,
        totalMoney,
        type,
        status: 0,
      });

      return res.status(200).json("Tạo thành công");
    } catch (error) {
      console.log(error);
      return res.status(403).json({ error });
    }
  }

  // [POST] /user
  async userCreateOrder(req, res) {
    const { address, fullName, city, telephone, email, totalMoney, type } =
      req.body;
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
        status: 0,
      });

      return res.status(200).json("Tạo thành công");
    } catch (error) {
      console.log(error);
      return res.status(403).json({ error });
    }
  }
}

module.exports = new OrdersController();

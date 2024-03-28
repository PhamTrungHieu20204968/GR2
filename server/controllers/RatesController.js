const { rates, users } = require("../models");
const { Op } = require("sequelize");
class RatesController {
  //[GET] /:productId
  async getProductRates(req, res) {
    const productId = parseInt(req.params.productId);
    try {
      const list = await rates.findAll({
        where: { productId: productId, rate: { [Op.gt]: 0 } },
        include: [
          {
            model: users,
            attributes: ["name", "avatar"],
          },
        ],
      });
      res.json(list);
    } catch (error) {
      console.log(error);
    }
  }

  //[PUT] /:productId
  async updateRate(req, res) {
    const productId = parseInt(req.params.productId);
    const values = req.body;
    try {
      if (req.user.role < 2) {
        const permission = await rates.findOne({
          where: {
            userId: req.user.id,
            productId: productId,
            status: 1,
          },
        });
        if (!permission) {
          return res.json({ error: "Bạn cần phải mua sản phẩm trước!" });
        }
      }
      await rates.update(
        {
          ...values,
        },
        { where: { userId: req.user.id, productId: productId } }
      );
      return res.json("Cảm ơn bạn đã đóng góp ý kiến!");
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }
}

module.exports = new RatesController();

const { products, categories, descriptions, images } = require("../models");

class ProductsController {
  // [POST] /create
  async createProduct(req, res) {
    if (req.user.role < 2) {
      return res.json({ error: "Không có quyền truy cập!" });
    }

    try {
      const [_category, _created] = await categories.findOrCreate({
        where: { name: req.body.category },
        default: {
          name: req.body.category,
        },
      });

      const _product = await products.create({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        categoryId: _category.id,
      });

      req.body.descriptions?.map(async (item) => {
        const _description = await descriptions.create({
          description: item.description,
          productId: _product.id,
        });

        if (item.image) {
          await images.create({
            url: item.image,
            descriptionId: _description.id,
          });
        }
      });

      req.body.images?.map(async (item) => {
        await images.create({
          url: item.image,
          productId: _product.id,
        });
      });

      return res.json("Tạo thành công");
    } catch (error) {
      console.log(error);
      return res.json({ error: "Tạo thất bại}!" });
    }
  }

  // [GET] /categories

  async getAllCategories(req, res) {
    try {
      const list = await categories.findAll();
      return res.json(list);
    } catch (error) {
      return res.json({ error: "Lỗi kết nối server!" });
    }
  }

  //  [GET] /admin
  async getAllProductsAdmin(req, res) {
    try {
      const list = await products.findAll({
        include: [images, categories],
      });
      return res.json(list);
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server!" });
    }
  }

  // [DELETE]
  async deleteProduct(req, res) {
    if (req.user.role < 2) {
      return res.json({ error: "Không có quyền truy cập!" });
    }

    const id = parseInt(req.params.id);
    try {
      await products.destroy({ where: { id: id } });
      return res.json("Xóa thành công!");
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server!" });
    }
  }
}

module.exports = new ProductsController();

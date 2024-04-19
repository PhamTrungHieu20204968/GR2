const { Op, where } = require("sequelize");
const {
  products,
  categories,
  descriptions,
  images,
  rates,
  orderItems,
  orders,
} = require("../models");
const ContentBasedRecommender = require("content-based-recommender");

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
        salePrice: req.body.salePrice,
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

  // [GET] /:id
  async getProduct(req, res) {
    const id = parseInt(req.params.id);
    try {
      const _product = await products.findOne({
        where: { id },
        include: [
          { model: images, attributes: ["url", "id"] },
          {
            model: descriptions,
            attributes: ["id", "description"],
            include: [
              {
                model: images,
                attributes: ["url", "id"],
              },
            ],
          },
          categories,
        ],
      });
      return res.json(_product);
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server!" });
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

  // [GET] /product/:name
  async getProductByName(req, res) {
    const name = req.params.name;
    try {
      const _product = await products.findOne({
        where: { name },
        include: [
          { model: images, attributes: ["url", "id"] },
          {
            model: descriptions,
            attributes: ["id", "description"],
            include: [
              {
                model: images,
                attributes: ["url", "id"],
              },
            ],
          },
          categories,
          rates,
        ],
      });
      return res.json(_product);
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server!" });
    }
  }

  // [GET] /category/:name
  async getAllProductsByCategory(req, res) {
    const name = req.params.name;
    try {
      if (name === "accessories") {
        const list = await products.findAll({
          include: [
            images,
            {
              model: categories,
              where: {
                id: 2,
              },
            },
          ],
          order: [["createdAt", "DESC"]],
        });
        return res.json(list);
      } else if (name === "foods") {
        const list = await products.findAll({
          include: [
            images,
            {
              model: categories,
              where: {
                id: 1,
              },
            },
          ],
          order: [["createdAt", "DESC"]],
        });
        return res.json(list);
      } else {
        const list = await products.findAll({
          include: [
            images,
            {
              model: categories,
              where: {
                id: {
                  [Op.gt]: 2,
                },
              },
            },
          ],
          order: [["createdAt", "DESC"]],
        });
        return res.json(list);
      }
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server!" });
    }
  }

  //  [GET] /
  async getAllProducts(req, res) {
    try {
      const list = await products.findAll({
        include: [images, categories],
        order: [["createdAt", "DESC"]],
      });
      return res.json(list);
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server!" });
    }
  }

  // [PUT] /update/:id
  async updateProduct(req, res) {
    if (req.user.role < 2) {
      return res.json({ error: "Không có quyền truy cập!" });
    }

    const id = parseInt(req.params.id);
    try {
      const [_category, _created] = await categories.findOrCreate({
        where: { name: req.body.category },
        default: {
          name: req.body.category,
        },
      });

      await products.update(
        {
          name: req.body.name,
          price: req.body.price,
          quantity: req.body.quantity,
          categoryId: _category.id,
          salePrice: req.body.salePrice,
        },
        { where: { id } }
      );

      await descriptions.destroy({
        where: {
          productId: id,
        },
      });

      await images.destroy({
        where: {
          productId: id,
        },
      });

      req.body.descriptions?.map(async (item) => {
        const _description = await descriptions.create({
          description: item.description,
          productId: id,
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
          productId: id,
        });
      });
      return res.json("Update thành công!");
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

  // [GET] similar-products
  async getSimilarProduct(req, res) {
    try {
      const list = await orderItems.findAll({
        include: [
          {
            model: orders,
            where: { userId: req.user.id },
          },
        ],
        group: ["productId", "id"],
        limit: 4,
        order: [["createdAt", "DESC"]],
      });
      if (!list) {
        return res.json({ error: "Không có sản phẩm nào!" });
      }
      const model = require("../model.json");
      const recommender = new ContentBasedRecommender();
      recommender.import(model);
      const reCommentItems = [];
      list.forEach((element) => {
        const similarDocuments = recommender.getSimilarDocuments(
          element.productId + "",
          0,
          8
        );
        let count = 0;
        similarDocuments.forEach((e) => {
          if (!reCommentItems.includes(+e.id) && count < 8 / list.length) {
            reCommentItems.push(+e.id);
            count++;
          }
        });
      });

      const reCommentProducts = await products.findAll({
        where: {
          id: reCommentItems,
        },
        include: [images, categories],
      });
      return res.json(reCommentProducts);
    } catch (error) {
      console.log(error);
      return res.json({ error: "Lỗi kết nối server!" });
    }
  }
}

module.exports = new ProductsController();

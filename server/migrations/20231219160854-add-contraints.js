"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addConstraint(
        "products",
        {
          type: "foreign key",
          name: "fk_product_category_categories_id",
          fields: ["categoryId"],
          references: {
            table: "categories",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "descriptions",
        {
          type: "foreign key",
          name: "fk_descriptions_products_id",
          fields: ["productId"],
          references: {
            table: "products",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "sales",
        {
          type: "foreign key",
          name: "fk_sales_products_id",
          fields: ["productId"],
          references: {
            table: "products",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "blogs",
        {
          type: "foreign key",
          name: "fk_blogs_users_id",
          fields: ["userId"],
          references: {
            table: "users",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "images",
        {
          type: "foreign key",
          name: "fk_images_products_id",
          fields: ["productId"],
          references: {
            table: "products",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "images",
        {
          type: "foreign key",
          name: "fk_images_descriptions_id",
          fields: ["descriptionId"],
          references: {
            table: "descriptions",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "images",
        {
          type: "foreign key",
          name: "fk_images_blogs_id",
          fields: ["blogId"],
          references: {
            table: "blogs",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "rates",
        {
          type: "foreign key",
          name: "fk_rates_products_id",
          fields: ["productId"],
          references: {
            table: "products",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "rates",
        {
          type: "foreign key",
          name: "fk_rates_users_id",
          fields: ["userId"],
          references: {
            table: "users",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "orders",
        {
          type: "foreign key",
          name: "fk_orders_users_id",
          fields: ["userId"],
          references: {
            table: "users",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "orderItems",
        {
          type: "foreign key",
          name: "fk_orderItems_products_id",
          fields: ["productId"],
          references: {
            table: "products",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "orderItems",
        {
          type: "foreign key",
          name: "fk_orderItems_orders_id",
          fields: ["orderId"],
          references: {
            table: "orders",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "searchs",
        {
          type: "foreign key",
          name: "fk_searchs_users_id",
          fields: ["userId"],
          references: {
            table: "users",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "comments",
        {
          type: "foreign key",
          name: "fk_comments_users_id",
          fields: ["userId"],
          references: {
            table: "users",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "comments",
        {
          type: "foreign key",
          name: "fk_comments_blogs_id",
          fields: ["blogId"],
          references: {
            table: "blogs",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "likes",
        {
          type: "foreign key",
          name: "fk_likes_blogs_id",
          fields: ["blogId"],
          references: {
            table: "blogs",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "likes",
        {
          type: "foreign key",
          name: "fk_likes_comments_id",
          fields: ["commentId"],
          references: {
            table: "comments",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "likes",
        {
          type: "foreign key",
          name: "fk_likes_users_id",
          fields: ["userId"],
          references: {
            table: "users",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );
    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint(
        "products",
        "fk_product_category_categories_id",
        { transaction }
      );

      await queryInterface.removeConstraint(
        "descriptions",
        "fk_descriptions_products_id",
        { transaction }
      );

      await queryInterface.removeConstraint("sales", "fk_sales_products_id", {
        transaction,
      });

      await queryInterface.removeConstraint("blogs", "fk_blogs_users_id", {
        transaction,
      });

      await queryInterface.removeConstraint("images", "fk_images_products_id", {
        transaction,
      });

      await queryInterface.removeConstraint(
        "images",
        "fk_images_descriptions_id",
        { transaction }
      );

      await queryInterface.removeConstraint("images", "fk_images_blogs_id", {
        transaction,
      });

      await queryInterface.removeConstraint("rates", "fk_rates_products_id", {
        transaction,
      });

      await queryInterface.removeConstraint("rates", "fk_rates_users_id", {
        transaction,
      });

      await queryInterface.removeConstraint("orders", "fk_rates_users_id", {
        transaction,
      });

      await queryInterface.removeConstraint(
        "orderItems",
        "fk_orderItems_products_id",
        {
          transaction,
        }
      );

      await queryInterface.removeConstraint(
        "orderItems",
        "fk_orderItems_orders_id",
        {
          transaction,
        }
      );

      await queryInterface.removeConstraint("searchs", "fk_searchs_users_id", {
        transaction,
      });

      await queryInterface.removeConstraint(
        "comments",
        "fk_comments_users_id",
        {
          transaction,
        }
      );

      await queryInterface.removeConstraint(
        "comments",
        "fk_comments_blogs_id",
        {
          transaction,
        }
      );

      await queryInterface.removeConstraint("likes", "fk_likes_blogs_id", {
        transaction,
      });

      await queryInterface.removeConstraint("likes", "fk_likes_comments_id", {
        transaction,
      });

      await queryInterface.removeConstraint("likes", "fk_likes_users_id", {
        transaction,
      });

      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  },
};

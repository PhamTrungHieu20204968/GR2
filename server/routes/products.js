const express = require("express");
const router = express.Router();
const productsController = require("../controllers/ProductsController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/create", validateToken, productsController.createProduct);
router.get("/categories", productsController.getAllCategories);
router.get("/admin", productsController.getAllProductsAdmin);
router.delete("/:id", validateToken, productsController.deleteProduct);

module.exports = router;

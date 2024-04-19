const express = require("express");
const router = express.Router();
const productsController = require("../controllers/ProductsController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/create", validateToken, productsController.createProduct);
router.get("/categories", productsController.getAllCategories);
router.get(
  "/similar-products",
  validateToken,
  productsController.getSimilarProduct
);
router.get("/category/:name", productsController.getAllProductsByCategory);
router.get("/", productsController.getAllProducts);
router.put("/update/:id", validateToken, productsController.updateProduct);
router.get("/:id", productsController.getProduct);
router.get("/product/:name", productsController.getProductByName);
router.delete("/:id", validateToken, productsController.deleteProduct);

module.exports = router;

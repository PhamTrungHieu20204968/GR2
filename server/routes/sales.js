const express = require("express");
const router = express.Router();
const salesController = require("../controllers/SalesController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, salesController.createSale);
router.get("/", validateToken, salesController.getUserSale);
module.exports = router;

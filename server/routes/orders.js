const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/OrdersController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/user", validateToken, ordersController.userCreateOrder);
router.post("/", ordersController.guestCreateOrder);
module.exports = router;

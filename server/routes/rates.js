const express = require("express");
const router = express.Router();
const ratesController = require("../controllers/RatesController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.put("/:productId", validateToken, ratesController.updateRate);
router.get("/:productId", ratesController.getProductRates);
module.exports = router;

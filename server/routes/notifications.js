const express = require("express");
const router = express.Router();
const notificationsController = require("../controllers/NotificationsController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.put("/", validateToken, notificationsController.updateSeenNotification);
router.post("/", validateToken, notificationsController.createNotification);
router.get("/", validateToken, notificationsController.getUserNotifications);
module.exports = router;

const express = require("express");
const router = express.Router();
const notificationsController = require("../controllers/NotificationsController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.put(
  "/schedule-notifications",
  validateToken,
  notificationsController.updateScheduleNotifications
);
router.put(
  "/update-remind/:orderId",
  validateToken,
  notificationsController.updateRemind
);
router.put("/:id", validateToken, notificationsController.updateNotification);
router.put("/", validateToken, notificationsController.updateSeenNotification);
router.post("/", validateToken, notificationsController.createNotification);
router.get("/remind", validateToken, notificationsController.getUserRemind);
router.get("/", validateToken, notificationsController.getUserNotifications);
router.delete("/remind/:orderId", notificationsController.deleteRemind);
router.delete("/:id", notificationsController.deleteNotification);
module.exports = router;

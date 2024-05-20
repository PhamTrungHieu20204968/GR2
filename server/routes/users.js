const express = require("express");
const router = express.Router();
const usersController = require("../controllers/UsersController");
const uploadCloud = require("../middlewares/Uploader");
require("dotenv").config();
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/signup", usersController.singUp);

router.post("/login", usersController.login);
router.post("/google-login", usersController.googleLogin);
router.post("/facebook-login", usersController.googleLogin);

router.get("/getOne", validateToken, usersController.getOne);
router.get("/getAll", validateToken, usersController.getAll);
router.put("/password/:id", validateToken, usersController.updatePassword);
router.put(
  "/:id",
  uploadCloud.single("avatar"),
  validateToken,
  usersController.updateUser
);
router.delete("/:id", validateToken, usersController.deleteUser);
module.exports = router;

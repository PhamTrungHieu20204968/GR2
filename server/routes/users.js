const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require("../controllers/UsersController");
require("dotenv").config();

router.post("/signup", usersController.singUp);

router.post("/login", usersController.login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/logout", usersController.logout);

router.get("/login/success", usersController.googleLoginSuccess);

router.get("/login/failed", usersController.googleLoginFailed);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/getOne", usersController.getOne);
module.exports = router;

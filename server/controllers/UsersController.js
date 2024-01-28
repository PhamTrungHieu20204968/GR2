const { users } = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { sign } = require("jsonwebtoken");

class UsersController {
  // [POST] /signup
  async singUp(req, res) {
    const { account, password, name, telephone } = req.body;
    const _user = await users.findOne({ where: { account } });
    console.log(_user);
    if (_user) {
      return res.json({ error: "Tài khoản đã tồn tại!" });
    }
    bcrypt.hash(password, 10).then(async (hash) => {
      try {
        await users.create({
          account,
          password: hash,
          name,
          telephone,
          role: 1,
          status: 0,
        });
        return res.json("SUCCESS!");
      } catch (error) {
        return res.json({ error });
      }
    });
  }

  // [POST] /login
  async login(req, res) {
    const { account, password } = req.body;

    const User = await users.findOne({ where: { account } });
    if (!User || !User.password) {
      return res.json({ error: "Người dùng không tồn tại!" });
    }

    bcrypt.compare(password, User.password).then((match) => {
      if (!match) {
        return res.json({ error: "Mật khẩu không chính xác!" });
      }
      const accessToken = sign(
        { id: User.id, role: User.role },
        "secretkey"
        //   { expiresIn: "4h" }
      );

      return res.json({
        role: User.role,
        accessToken,
      });
    });
  }

  // [GET] Google:login success
  async googleLoginSuccess(req, res) {
    console.log(req.user);
    console.log(123);
    if (req.user) {
      const [_user, created] = await users.findOrCreate({
        where: { googleId: req.user.id },
        defaults: {
          name: req.user.displayName,
          role: 1,
          account: req.user.emails[0].value,
          email: req.user.emails[0].value,
          avatar: req.user.photos[0].value,
          status: 0,
        },
      });
      const accessToken = sign(
        { id: _user.id, role: _user.role },
        "secretkey"
        //   { expiresIn: "4h" }
      );
      return res.status(200).json({
        role: _user.role,
        accessToken,
      });
    } else {
      res.status(403);
      return res.json({ error: "Đăng nhập thất bại" });
    }
  }
  // [GET] Google:login failed
  async googleLoginFailed(req, res) {
    return res.json({
      error: "Thất bại",
    });
  }

  // [GET] /logout
  async logout(req, res) {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
  }

  // [GET] /getOne
  async getOne(req, res) {
    const id = req.user?.id;
    const _user = await users.findOne({ where: { id } });
    if (_user) {
      return res.json(_user);
    } else {
      return res.json({ error: "Không tìm thấy người dùng!" });
    }
  }

  // [GET] /getAll
  async getAll(req, res) {
    if (req.user.role < 2) {
      return res.json({ error: "Không có quyền truy cập!" });
    }
    const List = await users.findAll({ where: { role: 1 } });
    return res.json(List);
  }
}

module.exports = new UsersController();

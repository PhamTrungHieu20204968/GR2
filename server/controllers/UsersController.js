const { users } = require("../models");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
require("dotenv").config();

const { sign } = require("jsonwebtoken");

class UsersController {
  // [POST] /signup
  async singUp(req, res) {
    const { account, password, name, telephone } = req.body;
    const _user = await users.findOne({ where: { account } });
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
        console.log(error);
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
        name: User.name,
        notificationSetting: User.notificationSetting,
        id: User.id,
      });
    });
  }

  // [GET] Google:login success
  async googleLoginSuccess(req, res) {
    if (req.user) {
      const [_user, created] = await users.findOrCreate({
        where: { googleId: req.user.id },
        defaults: {
          name: req.user.displayName,
          role: 1,
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
        id: _user.id,
        name: _user.name,
        notificationSetting: _user.notificationSetting,
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
    try {
      const _user = await users.findOne({
        where: { id },
        attributes: [
          "name",
          "avatar",
          "telephone",
          "email",
          "city",
          "address",
          "point",
          "rank",
          "title",
        ],
      });
      if (_user) {
        return res.json(_user);
      } else {
        return res.json({ error: "Không tìm thấy người dùng!" });
      }
    } catch (error) {
      console.log(error);
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

  // [PUT] /:id
  async updateUser(req, res) {
    const id = parseInt(req.params.id);
    const fileData = req.file;
    const user = req.body;
    if (req.user.role < 2 && req.user.id !== id) {
      return res.json({
        error: "Bạn không đủ quyền thực hiện chức năng này!",
      });
    }
    try {
      if (fileData) {
        await users.update(
          {
            ...user,
            avatar: fileData.path,
          },
          { where: { id } }
        );
      } else {
        await users.update(
          {
            ...user,
          },
          { where: { id } }
        );
      }
      return res.json("Cập nhật thành công");
    } catch (error) {
      console.log(error);
      if (fileData) {
        await cloudinary.uploader.destroy(fileData.filename);
      }
      return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
    }
  }

  // [PUT] /password/:id
  async updatePassword(req, res) {
    const id = parseInt(req.params.id);
    if (req.user.role < 2 && req.user.id !== id) {
      return res.json({
        error: "Bạn không đủ quyền thực hiện chức năng này!",
      });
    }
    const _user = await users.findOne({ where: { id } });
    if (!_user.account) {
      return res.json({
        error: "Bạn không thể cập nhật mật khẩu cho tài khoản này!",
      });
    }
    const { password } = req.body;
    bcrypt.hash(password, 10).then(async (hash) => {
      try {
        await _user.update(
          {
            password: hash,
          },
          { where: { id } }
        );
        return res.json("Cập nhật thành công");
      } catch (error) {
        console.log(error);
        if (fileData) {
          await cloudinary.uploader.destroy(fileData.filename);
        }
        return res.json({ error: "Lỗi kết nối server! Vui lòng thử lại sau." });
      }
    });
  }
}

module.exports = new UsersController();

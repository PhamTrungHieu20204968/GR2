const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.json({ error: "Bạn chưa đăng nhập!" });
  }

  try {
    const validToken = verify(accessToken, "secretkey");
    req.user = validToken;
    if (validToken) return next();
  } catch (error) {
    return res.json({ error });
  }
};

module.exports = { validateToken };

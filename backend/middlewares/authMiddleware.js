const { verify } = require("jsonwebtoken");
const User = require("../models/userModel.js");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const payload = verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.id);
      if (!user) {
        res.status(401).json({ error: "Нема такого користувача" });
      } else {
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(401).json({ error: "Недействительный токен" });
    }
  } else {
    res.status(401).json({ error: "Токен отсутствует" });
  }
};

module.exports = { authMiddleware };

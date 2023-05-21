const { verify } = require("jsonwebtoken");
const User = require("../models/userModel");
const authMiddleware = async (req, res, next) => {
  // Получение JWT-токена из заголовка Authorization
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const payload = verify(token, process.env.JWT_SECRET);
      console.log("payload", payload);
      const user = await User.findById(payload.id);
      console.log("user", user);
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

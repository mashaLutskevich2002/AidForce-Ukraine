import { Request, Response, NextFunction } from "express";
const verify = require("jsonwebtoken");
import User, from "../models/userModel";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const payload = verify(token, process.env.JWT_SECRET) as { id: string };
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

export { authMiddleware };

import { Response, Request } from "express";
import asyncHandler from "express-async-handler";
import User, { IUser } from "../models/userModel";
import { generateToken } from "../utils/generateToken";
import fs from "fs";
import { genSalt, hash } from "bcrypt";

interface AuthRequest extends Request {
  user?: IUser;
}
//@description     Register new user
//@route           POST /api/user/

export const registrationUser = asyncHandler(
  async (request: Request, res: Response) => {
    const {
      name,
      email,
      password,
      role,
      photoUrl,
      phone,
      cardNumber,
      last_name,
      militaryTicket,
    } = request.body;

    if (!name && !email && !password && !last_name && !cardNumber && !phone) {
      res.status(400);
      throw new Error("Заповніть всі поля");
    }

    if (!name) {
      if (!last_name) {
        res.status(400);
        throw new Error("Заповніть ім'я та прізвище");
      }
      if (!cardNumber) {
        res.status(400);
        throw new Error("Заповніть ім'я та номер картки");
      }
      if (!phone) {
        res.status(400);
        throw new Error("Заповніть ім'я та номер телефону");
      }
      if (!email) {
        res.status(400);
        throw new Error("Заповніть ім'я та email");
      }
      if (!password) {
        res.status(400);
        throw new Error("Заповніть ім'я та пароль");
      }
      res.status(400);
      throw new Error("Заповніть ім'я");
    }

    if (!email) {
      if (!last_name) {
        res.status(400);
        throw new Error("Заповніть email та прізвище");
      }
      if (!cardNumber) {
        res.status(400);
        throw new Error("Заповніть email та номер картки");
      }
      if (!phone) {
        res.status(400);
        throw new Error("Заповніть email та номер телефону");
      }
      if (!password) {
        res.status(400);
        throw new Error("Заповніть email та пароль");
      }
      res.status(400);
      throw new Error("Заповніть email");
    }

    if (!password) {
      if (!last_name) {
        res.status(400);
        throw new Error("Заповніть пароль та прізвище");
      }
      if (!cardNumber) {
        res.status(400);
        throw new Error("Заповніть пароль та номер картки");
      }
      if (!phone) {
        res.status(400);
        throw new Error("Заповніть пароль та номер телефону");
      }
      res.status(400);
      throw new Error("Придумайте пароль");
    }

    if (!cardNumber) {
      if (!last_name) {
        res.status(400);
        throw new Error("Заповніть номер картки та прізвище");
      }
      if (!phone) {
        res.status(400);
        throw new Error("Заповніть номер картки та номер телефону");
      }
      res.status(400);
      throw new Error("Заповніть номер картки");
    }

    if (!last_name) {
      if (!phone) {
        res.status(400);
        throw new Error("Заповніть номер телефону та прізвище");
      }
      res.status(400);
      throw new Error("Заповніть прізвище");
    }

    if (!phone) {
      res.status(400);
      throw new Error("Заповніть номер телефону");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400);
      throw new Error("Невалідний email");
    }

    const phoneRegex = /^\+380\(\d{2}\)-\d{2}-\d{2}-\d{3}$/;
    if (!phoneRegex.test(phone)) {
      res.status(400);
      throw new Error("Невалідний телефон");
    }

    const cardNumberRegex = /^\d{4}\/\d{4}\/\d{4}\/\d{4}$/;
    if (!cardNumberRegex.test(cardNumber)) {
      res.status(400);
      throw new Error("Невалідний номер картки");
    }
    // Чтение содержимого файла mockMilitaryTickets.json
    const readMockMilitaryTickets = () => {
      const jsonData = fs.readFileSync(
        "backend/mockMilitaryTickets/mockMilitaryTickets.json",
        "utf8"
      );
      return JSON.parse(jsonData);
    };
    // Проверка совпадения военного билета с mockMilitaryTickets.json с использованием регулярного выражения
    const checkMilitaryTicket = (ticket: string) => {
      const mockTickets = readMockMilitaryTickets();
      return mockTickets.includes(ticket);
    };

    if (role === "military" && !checkMilitaryTicket(militaryTicket)) {
      res.status(400);
      throw new Error("Військового квитка з таким номером не існує");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("Користувач з таким email вже існує");
    }

    const user = await User.create({
      name,
      last_name,
      email,
      password,
      role,
      phone,
      cardNumber,
      militaryTicket,
      photoUrl,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        cardNumber: user.cardNumber,
        photoUrl: user.photoUrl,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  }
);

//@description     Auth the user
//@route           POST /api/users/login
export const logInUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      cardNumber: user.cardNumber,
      photoUrl: user.photoUrl,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Невірний email або пароль");
  }
});

export const userInfo = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;

    res.json({
      _id: user._id,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      cardNumber: user.cardNumber,
      photoUrl: user.photoUrl,
      token: generateToken(user._id),
    });
  }
);

export const editUserInfo = asyncHandler(
  async (req: Request, res: Response) => {
    const { user } = req as AuthRequest;
    const { name, last_name, email, password, phone, photoUrl } = req.body;

    try {
      const userInfo = await User.findById(user._id.toString());

      if (!userInfo) {
        res.status(404).json({ error: "User not found" });
      }

      // Update user information
      userInfo.name = name;
      userInfo.last_name = last_name;
      userInfo.email = email;
      userInfo.phone = phone;
      userInfo.photoUrl = photoUrl;

      if (password) {
        const salt = await genSalt(10);
        userInfo.password = await hash(password, salt);
      }

      const updatedUser = await userInfo.save();

      res.json(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

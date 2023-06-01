const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const { generateToken } = require("../utils/generateToken.js");
const fs = require("fs");
const { genSalt, hash } = require("bcrypt");
const Application = require("../models/applicationModel");
const { BASE_DIR } = require("../config");

//@description     Register new user
//@route           POST /api/user/

const registrationUser = asyncHandler(async (request, res) => {
  const {
    name,
    email,
    password,
    role,
    photoUrl,
    phone,
    last_name,
    militaryTicket,
  } = request.body;

  if (!name && !email && !password && !last_name && !phone) {
    res.status(400);
    throw new Error("Заповніть всі поля");
  }

  if (!name) {
    if (!last_name) {
      res.status(400);
      throw new Error("Заповніть ім'я та прізвище");
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
    if (!phone) {
      res.status(400);
      throw new Error("Заповніть пароль та номер телефону");
    }
    res.status(400);
    throw new Error("Придумайте пароль");
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

  // Чтение содержимого файла mockMilitaryTickets.json
  const readMockMilitaryTickets = () => {
    const jsonData = fs.readFileSync(
      `${BASE_DIR}/static/mockMilitaryTickets.json`,
      "utf8"
    );
    return JSON.parse(jsonData);
  };
  // Проверка совпадения военного билета с mockMilitaryTickets.json с использованием регулярного выражения
  const checkMilitaryTicket = (ticket) => {
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
      photoUrl: user.photoUrl,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
const logInUser = asyncHandler(async (req, res) => {
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
      photoUrl: user.photoUrl,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Невірний email або пароль");
  }
});

const userInfo = asyncHandler(async (req, res) => {
  const { user } = req;

  res.json({
    _id: user._id,
    name: user.name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    photoUrl: user.photoUrl,
    token: generateToken(user._id),
  });
});

const editUserInfo = asyncHandler(async (req, res) => {
  const { user } = req;
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
    userInfo.password = password || user.password;

    const updatedUser = await userInfo.save();

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  await user.deleteOne();

  res.json({ message: "User deleted successfully" });
});

module.exports = {
  logInUser,
  registrationUser,
  editUserInfo,
  userInfo,
  deleteUser,
};

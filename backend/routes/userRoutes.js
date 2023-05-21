const express = require("express");
const {
  registrationUser,
  logInUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registrationUser);
router.route("/login").post(logInUser);

module.exports = router;

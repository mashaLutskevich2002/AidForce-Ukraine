import express from "express";
import { registrationUser, logInUser } from "../controllers/userControllers";

const router = express.Router();

router.route("/").post(registrationUser);
router.route("/login").post(logInUser);

export default router;

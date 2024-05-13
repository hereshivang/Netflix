import express from "express";
import { Register,Login,Logout } from "../Controllers/User.controllers.js";
const router = express.Router();
// User Routes 
router.route("/login").post(Login);
router.route("/register").post(Register);
router.route("/logout").get(Logout);

export default router;

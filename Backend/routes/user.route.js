import express from "express";
import { UserSignup, UserLogin, UserLogout } from "../controllers/user.controller.js";

const router= express.Router();
export default router

router.post("/signup",UserSignup);
router.post("/login",UserLogin);
router.post("/logout",UserLogout);
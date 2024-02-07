import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { registerSchemas, loginSchemas } from "../schemas/auth.schemas.js";

const router = Router()

router.post("/register", registerSchemas, authController.Register)
router.post("/login", loginSchemas, authController.Login)
router.post("/logout", authController.Logout)

export default router
import express from "express";
import { createUser, getAllUsers, getUser, updateUser, deleteUser, getUserByAccountId, getUserRole } from "../controllers/UserController.js";
import verifyToken from "../middlewares/jwtMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { registerSchemas } from "../schemas/auth.schemas.js";

const userRouter = express.Router();

userRouter.post("/", registerSchemas, createUser);
userRouter.post("/role", getUserRole);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser); 
userRouter.get("/usrAcc/:id", getUserByAccountId);
userRouter.put("/:id",  updateUser);
userRouter.delete("/:id", verifyToken, isAdmin, deleteUser);

export default userRouter;

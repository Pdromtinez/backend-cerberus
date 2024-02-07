import { Router } from "express";
import { createPreAccount, getPreAccount, getPreAccounts, deletePreAccount } from "../controllers/PreAccounts.controller.js";

const router = Router()

router.get("/", getPreAccounts);
router.get("/:id", getPreAccount);
router.post("/create",createPreAccount);
router.delete("/:id", deletePreAccount);

export default router
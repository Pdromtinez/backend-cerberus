import { Router } from "express";
import { createAccount, getAccount, updateAccount, getAccounts, getAccountByUserId , deleteAccount } from "../controllers/Account.controller.js";
import { AccountCreateSchemas } from "../schemas/account.schemas.js";
const router = Router()

router.get("/", getAccounts);
router.get("/:id", getAccount);
router.get("/acc/:id", getAccountByUserId);
router.get("/acc")
router.post("/", AccountCreateSchemas, createAccount);
router.put("/:id",  updateAccount);
router.delete("/:id", deleteAccount);

export default router
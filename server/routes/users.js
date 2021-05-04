import express from "express";
import { login, signup, purgeUsers } from "../controllers/user.js";

const router = express.Router();

/* Sign in a user */
router.post("/login", login);

/* Create a new user */
router.post("/signup", signup);

/* Purge Users database */
router.delete("/", purgeUsers);

export default router;

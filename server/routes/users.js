import express from "express";
import { login, signup, deleteUser } from "../controllers/user.js";

const router = express.Router();

/* Sign in a user */
router.post("/login", login);

/* Create a new user */
router.post("/signup", signup);

/* Delete a user */
router.delete("/:id", deleteUser);

export default router;

import express from "express";
import {
  getComments,
  createComment,
  deleteComment,
  likeComment,
} from "../controllers/comment.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/* Get comments for specific post */
router.get("/posts/:id/comments", getComments);

/* Create a new comment for specific post */
router.post("/posts/:id/comments", auth, createComment);

/* Like a comment */
router.patch("/comments/:id/like", auth, likeComment);

/* Delete a comment */
router.delete("/comments/:id", auth, deleteComment);

export default router;

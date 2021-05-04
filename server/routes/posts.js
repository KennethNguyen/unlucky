import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  likePost,
  deletePost,
  purgePosts,
} from "../controllers/post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/* Get all posts */
router.get("/", getPosts);

/* Create a new post */
router.post("/", auth, createPost);

/* Update an existing post */
router.patch("/:id", auth, updatePost);

/* Like a post */
router.patch("/:id/like", auth, likePost);

/* Delete a post */
router.delete("/:id", auth, deletePost);

/* Purge Post database */
router.delete("/", purgePosts);

export default router;

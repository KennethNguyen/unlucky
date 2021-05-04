import mongoose from "mongoose";
import Post from "../models/post.js";
import User from "../models/user.js";

/* Get all posts */
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all customers" });
  }
};

/* Create a post */
const createPost = async (req, res) => {
  try {
    const postData = req.body;
    const newPost = await Post.create({ ...postData, postedBy: req.userId });

    const user = await User.findById(req.userId);
    user.posts = user.posts.concat(newPost._id);
    await user.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

/* Update a post */
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ error: "Not a valid Object Id" });
    }

    const postExist = await Post.findById(id);

    if (!postExist) {
      return res.status(404).json({ error: "No post with that id" });
    }

    const updatedFields = { ...post, edited: true };

    const updatedPost = await Post.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

/* Like a post */
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ error: "Not a valid Object Id" });
    }
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "No post with that id" });
    }

    // have to typecast the elements in post.likes to a String for strict equality since req.userId is a String
    const index = post.likes.findIndex((refId) => String(refId) === req.userId);

    if (index === -1) {
      // like the post; index === -1 means that user id is not in the likes array
      post.likes = post.likes.concat(req.userId);
    } else {
      // dislike the post; delete user id from the likes array
      post.likes = post.likes.filter((refId) => String(refId) !== req.userId);
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

/* Delete a post */
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ error: "Not a valid Object Id" });
    }

    Post.findByIdAndDelete(id, (error, document) => {
      /* The PostSchema.post() middleware will execute here before rest of logic */
      if (error) {
        return res
          .status(404)
          .json({ error: "Error occurred while deleting post" });
      }
      if (!document) {
        return res.status(404).json({ error: "No post with that id" });
      }
      return res.status(204).json({ message: "Successfully deleted post" });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

/* Delete all posts from Post collection; just for testing purposes */
const purgePosts = async (req, res) => {
  try {
    await Post.deleteMany({});
    res.json({ message: "Purged all posts" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export { getPosts, createPost, updatePost, likePost, deletePost, purgePosts };

import mongoose from "mongoose";
import Post from "../models/post.js";
import User from "../models/user.js";

/* Get all posts */
const getPosts = async (req, res) => {
  try {
    /* Nesting mongoose populate and selecting attributes from the document */
    const posts = await Post.find({})
      .populate({ path: "postedBy", select: "_id username" })
      .populate({
        path: "comments",
        populate: [{ path: "userId", select: "_id username" }],
      });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all customers" });
  }
};

/* Create a post */
const createPost = async (req, res) => {
  try {
    const postData = req.body;
    let newPost = await Post.create({
      ...postData,
      postedBy: req.userId,
    });

    const user = await User.findById(req.userId);
    user.posts = user.posts.concat(newPost._id);
    await user.save();

    newPost = await newPost
      .populate("postedBy", {
        _id: 1,
        username: 1,
      })
      .execPopulate(); // needed to populate the created post

    res.status(201).json(newPost);
  } catch (error) {
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

    postExist.title = post.title;
    postExist.text = post.text;
    postExist.hashTag = post.hashTag;

    const updatedPost = await Post.findByIdAndUpdate(id, postExist, {
      new: true,
    })
      .populate({ path: "postedBy", select: "_id username" })
      .populate({
        path: "comments",
        populate: [{ path: "userId", select: "_id username" }],
      });

    res.status(200).json(updatedPost);
  } catch (error) {
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

    const updatedPost = await Post.findByIdAndUpdate(id, post, {
      new: true,
    })
      .populate({ path: "postedBy", select: "_id username" })
      .populate({
        path: "comments",
        populate: [{ path: "userId", select: "_id username" }],
      });

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

export { getPosts, createPost, updatePost, likePost, deletePost };

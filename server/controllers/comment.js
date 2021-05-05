import mongoose from "mongoose";
import Comment from "../models/comment.js";
import Post from "../models/post.js";

/* Get all comments for a specific post */
const getComments = async (req, res) => {
  try {
    const { id: paramPostId } = req.params;

    if (!mongoose.isValidObjectId(paramPostId)) {
      return res.status(404).json({ error: "Not a valid Object Id" });
    }

    const postExist = await Post.findById(paramPostId);

    if (!postExist) {
      return res.status(404).json({ error: "No post with that id" });
    }

    const comments = postExist.comments;

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all comments for post" });
  }
};

/* Create a comment */
const createComment = async (req, res) => {
  try {
    const { id: paramPostId } = req.params;
    const { text } = req.body;
    const newComment = await Comment.create({
      text,
      userId: req.userId,
      postId: paramPostId,
    });

    const post = await Post.findById(paramPostId);
    post.comments = post.comments.concat(newComment._id);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

/* Delete a comment */
const deleteComment = async (req, res) => {
  try {
    const { id: paramCommentId } = req.params;
    if (!mongoose.isValidObjectId(paramCommentId)) {
      return res.status(404).json({ error: "Not a valid Object Id" });
    }

    Comment.findByIdAndDelete(paramCommentId, (error, document) => {
      /* The CommentSchema.post() middleware will execute here before rest of logic */
      if (error) {
        return res
          .status(404)
          .json({ error: "Error occurred while deleting comment" });
      }
      if (!document) {
        return res.status(404).json({ error: "No comment with that id" });
      }
      return res.status(204).json({ message: "Successfully deleted comment" });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

/* Like a comment */
const likeComment = async (req, res) => {
  try {
    const { id: paramCommentId } = req.params;
    if (!mongoose.isValidObjectId(paramCommentId)) {
      return res.status(404).json({ error: "Not a valid Object Id" });
    }

    const comment = await Comment.findById(paramCommentId);

    if (!comment) {
      return res.status(404).json({ error: "No comment with that id" });
    }

    // have to typecast the elements in comment.likes to a String for strict equality since req.userId is a String
    const index = comment.likes.findIndex(
      (refId) => String(refId) === req.userId
    );

    if (index === -1) {
      // like the comment; index === -1 means that user id is not in the likes array
      comment.likes = comment.likes.concat(req.userId);
    } else {
      // dislike the comment; delete user id from the likes array
      comment.likes = comment.likes.filter(
        (refId) => String(refId) !== req.userId
      );
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      paramCommentId,
      comment,
      {
        new: true,
      }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

/* Delete all comments from Comment collection; just for testing purposes */
const purgeComments = async (req, res) => {
  try {
    await Comment.deleteMany({});
    res.json({ message: "Purged all comments" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export {
  getComments,
  createComment,
  deleteComment,
  likeComment,
  purgeComments,
};

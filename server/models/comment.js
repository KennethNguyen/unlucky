import mongoose from "mongoose";
import Post from "./post.js";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  timeCommented: { type: Date, default: new Date() },
});

/* Delete the comment from the specific Post's comments array */
CommentSchema.post("findOneAndDelete", async (doc) => {
  if (!doc) return;
  try {
    await Post.updateOne({ _id: doc.postId }, { $pull: { comments: doc._id } });
  } catch (error) {
    console.log(error);
  }
});

export default mongoose.model("Comment", CommentSchema);

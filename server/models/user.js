import mongoose from "mongoose";
import Post from "./post.js";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  posts: {
    type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    default: [],
  },
});

/* Remove all posts created by the user in the Post collection */
UserSchema.post("findOneAndDelete", async (doc) => {
  if (!doc) return;
  try {
    for (let postId of doc.posts) {
      await Post.findByIdAndDelete(postId);
    }
  } catch (error) {
    console.log(error);
  }
});

export default mongoose.model("User", UserSchema);

import mongoose from "mongoose";
import User from "./user.js";
import Comment from "./comment.js";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  text: String,
  hashTag: String,
  postedBy: { type: Schema.Types.ObjectId, ref: "User" },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  comments: {
    type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    default: [],
  },
  timePosted: { type: Date, default: new Date().toISOString() },
  edited: { type: Boolean, default: false },
});

/* Delete the post from the User's created posts array */
PostSchema.post("findOneAndDelete", async (doc) => {
  if (!doc) return;
  try {
    await User.updateOne({ _id: doc.postedBy }, { $pull: { posts: doc._id } });
    for (let commentId of doc.comments) {
      await Comment.findByIdAndDelete(commentId);
    }
  } catch (error) {
    console.log(error);
  }
});

export default mongoose.model("Post", PostSchema);

import mongoose from "mongoose";

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
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  timePosted: { type: Date, default: new Date() },
  edited: { type: Boolean, default: false },
});

export default mongoose.model("Post", PostSchema);

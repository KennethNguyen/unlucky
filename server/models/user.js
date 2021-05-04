import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  posts: {
    type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    default: [],
  },
});

export default mongoose.model("User", UserSchema);

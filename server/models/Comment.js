const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    writer: { type: mongoose.Types.ObjectId, ref: "User" },
    postId: { type: String },
    reponseTo: { type: mongoose.Types.ObjectId, ref: "User" },
    content: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);

const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    movieId: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);

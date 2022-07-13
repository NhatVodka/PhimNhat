const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema(
  {
    Genre: { type: String, required: true, unique: true },
    Movies: { type: Array },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Genre", GenreSchema);

const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    poster_path: { type: String },
    backdrop_path: { type: String },
    trailer: { type: Array },
    video: { type: String },
    time: { type: Number },
    cast: { type: Array },
    release_date: { type: Number },
    vote_average: { type: Number },
    genre: { type: Array },
    country: { type: String },
    category: { type: String },
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Movie", MovieSchema);

const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    poster_path: { type: String, required: true },
    backdrop_path: { type: String, required: true  },
    trailer: { type: Array, required: true },
    video: { type: String, required: true },
    time: { type: Number },
    cast: { type: Array },
    release_date: { type: Number },
    vote_average: { type: Number },
    genre: { type: Array, required: true },
    country: { type: String },
    category: { type: String},
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Movie", MovieSchema);

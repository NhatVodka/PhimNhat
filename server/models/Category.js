const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true, unique: true },
    page: { type: Number },
    results: { type: Array },
    total_page: { type: Number },
    total_results: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", categorySchema);

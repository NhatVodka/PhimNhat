const router = require("express").Router();
const Comment = require("../models/Comment");
const verify = require("../verifyToken");

// CREATE NEW Comment
router.post("/", verify, async (req, res) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE COMMENT
router.delete("/:id", verify, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.isAdmin) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("This comment has been deleted");
    } else {
      return res.status(403).json("You can delete only your comment");
    }
  } catch (error) {
    res.status(500).json("You are not allowed");
  }
});

// GET ALL COMMENT
router.get("/:movieId", async (req, res) => {
  try {
    const comment = await Comment.find({ movieId: req.params.movieId });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

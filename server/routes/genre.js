const router = require("express").Router();
const Genre = require("../models/Genre");
const verify = require("../verifyToken");

// CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const newGenre = await Genre.create(req.body);
      res.status(201).json(newGenre);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!!");
  }
});

// DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    await Genre.findByIdAndDelete(req.params.id);
    try {
      res.status(201).json("Genre has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!!");
  }
});

// UPDATE Category
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedGenre = await Genre.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedGenre);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!!");
  }
});

// GET
router.get("/", async (req, res) => {
  const Genrequery = req.query.Genre;
  const Movie = req.query.Movies;
  let movie = [];
  try {
    if (Genrequery) {
      if (Movie) {
        movie = Genre.aggregate([
          { $sample: { size: 10 } },
          { $match: { Genre: Genrequery, Movies: Movie } },
        ]);
      } else {
        movie = await Genre.aggregate([
          { $sample: { size: 10 } },
          { $match: { Genre: Genrequery } },
        ]);
      }
    } else {
      movie = await Genre.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

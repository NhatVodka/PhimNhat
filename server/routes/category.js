const router = require("express").Router();
const Category = require("../models/Category");
const verify = require("../verifyToken");

// CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const savedCategory = await Category.create(req.body);
      res.status(201).json(savedCategory);
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
    await Category.findByIdAndDelete(req.params.id);
    try {
      res.status(201).json("Category has been deleted");
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
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!!");
  }
});
// GET
router.get("/", async (req, res) => {
  const categoryQuery = req.query.categoryName;
  const pageQuery = req.query.page;
  let category = [];

  try {
    if (categoryQuery) {
      if (pageQuery) {
        category = await Category.aggregate([
          { $sample: { size: 10 } },
          { $match: { categoryName: categoryQuery, page: pageQuery } },
        ]);
      } else {
        category = await Category.aggregate([
          { $sample: { size: 10 } },
          { $match: { categoryName: categoryQuery } },
        ]);
      }
    } else {
      category = await Category.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

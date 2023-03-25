const router = require("express").Router();
const { Comment, User, Article } = require("../../models");
const withAuth = require("../../utils/withAuth");

// POST to create new article route
router.post("/", withAuth, async (req, res) => {
  try {
    const newArticle = await Article.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newArticle);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

const router = require("express").Router();
const { Comment, User, Article } = require("../../models");
const withAuth = require('../../utils/auth');

// GET Edit
router.get("/:id", async (req, res) => {
  try {
    const articleData = await Article.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          attributes: ["content", "created_at"],
          include: { model: User, attributes: ["username"] },
        },
      ],
    });

    const article = articleData.get({ plain: true });

    res.render("edit", {
      ...article,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT Edit
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedArticle = await Article.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedArticle) {
      res.status(404).json({ message: "No article post found with this id." });
      return;
    }

    res.json(updatedArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE Edit
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const articleData = await Article.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!articleData) {
      res.status(404).json({ message: "No article found with this id." });
      return;
    }

    res.status(200).json(articleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

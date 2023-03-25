const path = require("path");
const router = require("express").Router();
const { User, Article, Comment } = require("../models");
const withAuth = require("../utils/withAuth");

// GET for Home
router.get("/", async (req, res) => {
  try {
    // Get all articles and JOIN with user
    const articleData = await Article.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });

    const articles = articleData.map((article) => article.get({ plain: true }));
    res.render("home", {
      articles,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET for single article
router.get("/article/:id", async (req, res) => {
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

    res.render("article", {
      ...article,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET for Dashboard
// withAuth middleware prevents access to route unless logged in
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user by session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Article }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Log In
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// GET Sign Up
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

module.exports = router;
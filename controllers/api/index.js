const router = require("express").Router();

const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");
const articleRoutes = require("./articleRoutes");
const editRoutes = require("./editRoutes");

router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/articles", articleRoutes);
router.use("/edit", editRoutes);

module.exports = router;
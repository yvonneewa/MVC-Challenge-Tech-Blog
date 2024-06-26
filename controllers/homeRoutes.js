const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
// const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: User,
    });

    console.log(blogData);

    const blogPosts = blogData.map((blog) => blog.get({ plain: true }));

    console.log(blogPosts);

    res.render("homepage", {
      blogPosts: blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/project/:id", async (req, res) => {
  try {
    const homeRoutesData = await homeRoutes.findByPk(req.params.id, {
      include: [
        {
          model: user,
          attributes: ["name"],
        },
      ],
    });

    const homeRoutes = homeRoutesData.get({ plain: true });

    res.render("project", {
      ...project,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/dashboard", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
   include:[Blog] 
    });

    const user = userData.get({ plain: true });
console.log(user)
    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;

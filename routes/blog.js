const { Router } = require("express");
const multer = require("multer");
const Blog = require("../models/blog");

const blogRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({ storage: storage });

blogRouter.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImgURL: `/uploads/${req.file.filename}`,
  });
  res.redirect(`/blog/${blog._id}`);
});

blogRouter.get("/add-new", (req, res) => {
  res.render("addBlog", {
    user: req.user,
  });
});

module.exports = blogRouter;

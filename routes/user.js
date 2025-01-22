const { Router } = require("express");
const User = require("../models/user");
const multer = require("multer");

const userRouter = Router();

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

userRouter.get("/signup", (req, res) => {
  res.render("signup");
});

userRouter.get("/signin", (req, res) => {
  res.render("signup");
});

userRouter.post("/signup", upload.single("profileImg"), async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(fullName);
  try {
    await User.create({
      fullName: fullName,
      email: email,
      password: password,
      profileImageURL: `/uploads/${req.file.filename}`,
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("signup", { error: error });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.checkUserAndCreateToken(email, password);
    console.log("right password " + token);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("signup", {
      error: error,
    });
  }
});

userRouter.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/user/signup");
});

module.exports = userRouter;

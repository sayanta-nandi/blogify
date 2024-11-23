const { Router } = require("express");
const User = require("../models/user");

const userRouter = Router();

userRouter.get("/signup", (req, res) => {
  res.render("signup");
});

userRouter.get("/signin", (req, res) => {
  res.render("signup");
});

userRouter.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(fullName);
  await User.create({
    fullName: fullName,
    email: email,
    password: password,
  });
  return res.redirect("/");
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

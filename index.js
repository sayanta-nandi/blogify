const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
var cookieParser = require("cookie-parser");
const { checkAuthCookie } = require("./middleware/auth");

const app = express();
const PORT = 8000;

mongoose.connect("mongodb://localhost:27017/blogify").then((err) => {
  console.log("mongoDB is connected");
}); //for connecting mongo

app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); //for html
app.use(express.static("public")); //for css

app.use(express.urlencoded({ extended: false })); //for decode form data
app.use(cookieParser()); //to access cookie
app.use(checkAuthCookie("token")); //for authentication -> if cookie is there, it attach it to req.user

app.get("/", (req, res) => {
  return res.render("home", {
    user: req.user,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));

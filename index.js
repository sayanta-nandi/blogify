const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const router = require("./routes/user");
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
app.use(cookieParser());
app.use(checkAuthCookie("token"));

app.get("/", (req, res) => {
  return res.render("home", {
    user: req.user,
  });
});

app.use("/user", router);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));

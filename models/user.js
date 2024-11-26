const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { error } = require("console");
const { createTokenForUser } = require("../service/auth");

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  profileImageURL: {
    type: String,
    default: "/image/profile-photo.png",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  console.log(this);
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.password = hashedPassword;
  this.salt = salt;
  console.log("password: " + hashedPassword + " salt: " + salt);
  next();
});

userSchema.static("checkUserAndCreateToken", async function (email, password) {
  const user = await this.findOne({ email: email });
  if (!user) throw new Error("No user found");
  const salt = user.salt;
  const hashedPassword = user.password;
  const providedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  if (hashedPassword !== providedPassword) throw new Error("Wrong Password");
  const token = createTokenForUser(user);
  return token;
});

const User = model("user", userSchema);

module.exports = User;

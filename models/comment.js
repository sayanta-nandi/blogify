const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  blogId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "blog",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

const Comment = model("comment", commentSchema);

module.exports = Comment;

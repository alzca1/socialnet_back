const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const postSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "likes",
    },
  ],
});

module.exports = model("Post", postSchema); 
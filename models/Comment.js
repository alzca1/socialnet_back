const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "likes",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema);

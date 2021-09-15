const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "users",
    // },
    username: String, 
    comments: [
      {
        body: String, 
        username: String,
        createdAt: String
      },
    ],
    likes: [
      {
        username: String, 
        createdAt: String, 
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);

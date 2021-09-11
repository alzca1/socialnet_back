const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const likeSchema = new Schema(
  {
    username: String
  },
  {
    timestamps: true,
  }
);

module.exports = model("Like", likeSchema);

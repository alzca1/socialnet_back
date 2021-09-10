const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const likeSchema = new Schema(
  {
    user: {
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Like", likeSchema);

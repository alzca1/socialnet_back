const Post = require("../models/Post");
const Like = require("../models/Like");
const authChecker = require("../utils/checkauth");

module.exports = {
  Mutation: {
    async likePost(parent, { postID }, context) {
      const user = authChecker(context);
      const post = await Post.findById(postID);

      try {
        if (post) {
          if (post.likes.find((like) => like.username === user.username)) {
            post.likes = post.likes.filter(
              (like) => like.username !== user.username
            );
          } else {
            const newLike = new Like({
              username: user.username,
              user: user.id,
            });
            post.likes.push(newLike);
          }
          await post.save();
          return post;
        }
      } catch (error) {
        throw new Error("There was an error", error);
      }
    },
  },
};

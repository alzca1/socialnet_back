const Post = require("../models/Post");
const Comment = require("../models/Comment");
const authChecker = require("../utils/checkauth");
const { UserInputError } = require("apollo-server");
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = {
  Mutation: {
    async createComment(parent, { postID, body }, context) {
      const user = authChecker(context);
      console.log(user);
      if (body.trim() === "") {
        throw new UserInputError("The comment cannot be empty", {
          errors: {
            body: "The comment cannot be empty",
          },
        });
      }
      const post = await Post.findById(postID);

      if (post) {
        const newComment = new Comment({
          body,
          username: user.username,
          user: user.id,
          createdAt: new Date(),
        });

        post.comments.unshift(newComment);
        await post.save();
        return post;
      } else {
        throw new UserInputError(
          "There was a problem adding the comment. Post not found"
        );
      }
    },
    async deleteComment(parent, { postID, commentID }, context) {
      const user = authChecker(context);
      try {
        const post = await Post.findById(postID);
        console.log(post);
        if (post) {
          const commentIndex = post.comments.findIndex((comment) => {
            return comment._id.toString() == commentID;
          });
          if (post.comments[commentIndex].username === user.username) {
            await post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          }else{
              throw new AuthenticationError("You cannot delete this comment")
          }
        }
      } catch (error) {
        throw new UserInputError("There was an error", error);
      }
    },
  },
};

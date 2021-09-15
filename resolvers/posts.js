const Post = require("../models/Post");
const authChecker = require("../utils/checkauth");
const { AuthenticationError } = require("apollo-server");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });

        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { id }) {
      try {
        const post = await Post.findById(id);

        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = authChecker(context);

      try {
        if (body.trim() === "") {
          errors.body = "Body cannot be empty; "
          throw new UserInputError("Body cannot be empty", {
            errors
          });
        }
        const newPost = new Post({ body, username: user.username });
        const post = await newPost.save();
        return post;
      } catch (error) {
        throw new Error("Body cannot be empty", error);
      }
    },
    async deletePost(_, { postId }, context) {
      const user = authChecker(context);
      try {
        const post = await Post.findById(postId);

        if (user.id === post.user.toJSON()) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new Error("Post could not be deleted");
        }
      } catch (error) {
        throw new AuthenticationError("There was an error", error);
      }
    },
  },
};

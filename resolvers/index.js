const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");
const likesResolvers = require("./likes");

module.exports = {
  Post: {
    likesCount: (parent) => {
      return parent.likes.length;
    },
    commentsCount: (parent) => {
      return parent.comments.length;
    },
  },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...likesResolvers.Mutation,
  },
};

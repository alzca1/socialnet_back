const gql = require("graphql-tag");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    user: ID!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    likesCount: Int!
    commentsCount: Int!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    password: String!
    createdAt: String!
  }
  type Comment {
    id: ID!
    body: String!
    user: ID!
    username: String!
    likes: [Like]!
    createdAt: String!
  }

  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  input RegisterInfo {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input LoginInfo {
    username: String!
    password: String!
  }
  type Query {
    getPosts: [Post]
    getPost(id: ID!): Post
  }

  type Mutation {
    register(registerInfo: RegisterInfo): User!
    login(loginInfo: LoginInfo): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postID: ID!, body: String!): Post!
    deleteComment(postID: ID!, commentID: ID!): Post!
    likePost(postID: ID!): Post!
  }
`;

module.exports = typeDefs;

const gql = require("graphql-tag");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    user: ID!
    createdAt: String!
  }
  type User {
      id: ID!
      email: String!
      token: String!
      username: String!
      password: String!
      createdAt: String!
  }

  input RegisterInfo {
      username: String!,
      password: String!, 
      confirmPassword: String!, 
      email: String!
  }
  type Query {
    getPosts: [Post]
  }

  type Mutation {
      register(registerInfo: RegisterInfo): User!
  }
`;

module.exports = typeDefs;

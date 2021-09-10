require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typedefs");
const resolvers = require("./resolvers/index");
const localDatabaseURI = "mongodb://localhost/social";
//let externalDatabaseURI;

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(localDatabaseURI)
  .then((res) => {
    server.listen({ port: 4000 });
    
  })
  .then((res) => console.log("server listening"))
  .catch((err) => console.log("there was an error connecting to the db", err));

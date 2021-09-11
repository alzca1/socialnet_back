const jsonwebtoken = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
const SECRET_KEY = process.env.SECRET_KEY;

const authChecker = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        const user = jsonwebtoken.verify(token, SECRET_KEY);

        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid or expired token", error);
      }
    }
    throw new Error(
      "Authentication token must have a correct format: Bearer [token]"
    );
  }
  throw new Error("Authentication header must be provided");
};

module.exports = authChecker;

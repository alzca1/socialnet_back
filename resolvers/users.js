const { UserInputError } = require("apollo-server");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const User = require("../models/User");
const validateRegistration = require("../utils/validators");

const saltRounds = 10;
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  Mutation: {
    async register(
      parent,
      { registerInfo: { username, email, password, confirmPassword } }
    ) {
      const { valid, errors } = validateRegistration(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", errors);
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is registered already", {
          errors: {
            username:
              "This username is already registered. Please use another one",
          },
        });
      }
      // TODO: make sure user doesnt already exist
      // DONE: hash password and create auth token
      password = await bcryptjs.hash(password, saltRounds);
      const newUser = new User({ email, username, password });

      const result = await newUser.save();

      const token = jsonwebtoken.sign(
        {
          id: result.id,
          username: result.username,
          email: result.email,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      return {
        ...result._doc,
        id: result._id,
        token,
      };
    },
  },
};

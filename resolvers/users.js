const { UserInputError } = require("apollo-server");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const User = require("../models/User");
const { validateRegistration, validateLogin } = require("../utils/validators");

const saltRounds = 10;
const SECRET_KEY = process.env.SECRET_KEY;

const tokenizer = (user) => {
  return jsonwebtoken.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Mutation: {
    async login(parent, { loginInfo: { username, password } }) {
      const { errors, valid } = validateLogin(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      const match = await bcryptjs.compare(password, user.password);
      if (!match) {
        errors.password = "Password is not correct";
        throw new UserInputError("Password incorrect", { errors });
      }

      const token = tokenizer(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async register(
      parent,
      { registerInfo: { username, password, confirmPassword, email } }
    ) {
      const { errors, valid } = validateRegistration(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      let user = await User.findOne({ username });
      if (user) {
        errors.username = "Username already taken. Please, use another one";
        throw new UserInputError("Username taken", { errors });
      }

      password = await bcryptjs.hash(password, saltRounds);

      const newUser = new User({
        email,
        username,
        password,
      });

      const result = await newUser.save();
      const token = tokenizer(newUser);
      return {
        ...result._doc,
        id: result._id,
        token,
      };
    },
  },
};

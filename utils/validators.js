const validateRegistration = (username, email, password, confirmPassword) => {
  const errors = {};
  const regex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else if (!regex.test(email)) {
    errors.email = "Email must be a valid email address";
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords mismatch"
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports = validateRegistration;

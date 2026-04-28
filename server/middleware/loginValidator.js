const { check } = require("express-validator");

const loginValidator = [
  // requirements
  check("email", "Invalid e-mail").isEmail(),
  check("password", "Invalid password").exists(),

  // validation control is in userLogin.controller.js file
];
module.exports = loginValidator;
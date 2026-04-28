const { check } = require("express-validator");

const regValidator = [
    // requirements
    check("name", "Please check Name").notEmpty().isString(),
    check("surname", "Please check Surname").notEmpty().isString(),
    check("email", "Please check e-mail").isEmail(),
    check(
      "password",
      "Password weak or missing min 8 characters, one capital, and a symbol like !,£,$,%...."
    ).isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  
    // validation control is in user.controller.js file
  ];
  module.exports = regValidator;
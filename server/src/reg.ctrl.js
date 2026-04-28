const express = require("express");
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/User");
const SECRET = process.env.SECRET;

async function regNewUser(req, res) {
  // validation on the user input

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // validation passed
  const { name, surname, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json([{ msg: "User with this e-mail already exist" }]);
    }
    // if new user doesn exist in db then user instance is created
    user = new User({
      name: name,
      surname: surname,
      email: email,
      password: password,
    });
    //###################################################
    // user password hashed
    user.password = await bcrypt.hash(password, 10);
    // ##################################################
    // user saved
    await user.save();
    // -----------------------------------JWT-----------------------
    // jwt
    jwt.sign(
      { id: user.id },
      SECRET,
      { expiresIn: "10h" },
      (err, token) => {
        if (err) {
          console.error(err.message);
        }

        res.status(200).json({ msg: "User saved in database", token: token });
      }
    );
    // -----------------------------------JWT----------------------

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = {
  regNewUser,
};
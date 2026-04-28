const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const SECRET = process.env.SECRET;

// ==============================================

async function loginUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // exposed to the UI random msg for wrong pass or user
    // real errors from validations in the console.log for now
    console.log(errors)
    return res.status(400).json({ msg: "Invalid email or password !" });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ msg: "Invalid email or password !" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password !" });
    }

    // -------------------------JWT-----------------------
    // jwt
    jwt.sign(
      { id: user.id },
      SECRET,
      { expiresIn: "10h" },
      (err, token) => {
        if (err) {
          console.error(err.message);
        }
        res.status(200).json({ msg: "User logged in", token: token });
      }
    );
    // -------------------------------JWT-------------------
    // res.status(200).json({ msg: "user logged in" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json([{ msg: "Server ERROR" }]);
  }
};
// =========================================================
//   Return User
async function returnUser(req, res) {
  // console.log(req.userId);
  let user = await User.findOne({ _id: req.userId }).select("-password");
  res.status(200).json({ msg: "User Auth ok", user: user });
}

module.exports = {
  loginUser,
  returnUser,
};
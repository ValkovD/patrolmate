const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

// middleware function that decodes the token payload
// and assign it to the req header so it can be used to get user from db
function authUser(req, res, next) {
  const token = req.header("x-auth-token");
  // check if token in header

  if (!token) {
    return res.status(401).json([{ msg: "Unauthorized access DENIED !!!!" }]);
  }
  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res
      .status(500)
      .json([{ msg: "Server Error", error: err.message }]);
  }
}

module.exports = { authUser };
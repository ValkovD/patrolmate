const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

function decodeId(token) {
    const decoded = jwt.verify(token, SECRET);
    return decoded.id
}
module.exports = { decodeId }
var jwt = require("jsonwebtoken");

const secret = "$@y@nt@";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    profileImageURL: user.profileImageURL,
  };
  var token = jwt.sign(payload, secret);
  return token;
}

function validateToken(token) {
  var payload = jwt.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};

const jwt = require("jsonwebtoken");

module.exports = payload => {
  return jwt.sign(payload, "exambackend", { expiresIn: "12h" });
};

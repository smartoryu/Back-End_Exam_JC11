const crypto = require("crypto");

module.exports = password => {
  return crypto
    .createHmac("sha256", "exambackend")
    .update(password)
    .digest("hex");
};

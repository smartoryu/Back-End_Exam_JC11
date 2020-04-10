const jwt = require("jsonwebtoken");
const fs = require("fs");

module.exports = {
  auth: (req, res, next) => {
    if (req.method !== "OPTIONS") {
      let publicKEY = fs.readFileSync("./public.key", "utf8");
      jwt.verify(req.token, publicKEY, { expiresIn: "6h", algorithm: ["RS256"] }, (error, decoded) => {
        if (error) {
          return res.status(401).json({ message: "User not authorized.", error: "User not authorized." });
        }

        req.user = decoded;
        next();
      });
    } else {
      next();
    }
  },
};

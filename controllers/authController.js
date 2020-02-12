const { mysqldb } = require("../database");
const moment = require("moment");
const encrypt = require("../helpers/encrypt");
const createJWTToken = require("../helpers/jwt");

module.exports = {
  hashpassword: (req, res) => {
    let hashpassword = encrypt(req.query.password);
    return res.send(hashpassword);
  },

  checkUsername: (req, res) => {
    let { username } = req.query;
    console.log(username);

    let sql = `SELECT username FROM users WHERE username = '${username}'`;
    mysqldb.query(sql, (err, result) => {
      if (err) res.status(500).send(err);

      if (result[0]) {
        return res.status(200).send({ status: "WRONG_USER", message: "Username not available!" });
      } else {
        return res.status(200).send({ status: "GOOD_USER" });
      }
    });
  },

  login: (req, res) => {
    let { id } = req.params;
    let { username, password } = req.query;

    if (username || password) {
      let sql = `SELECT username FROM users WHERE username = '${username}'`;
      mysqldb.query(sql, (err, resUsername) => {
        if (err) res.status(500).send(err);

        // console.log("masuk");

        // === IF USERNAME NOT REGISTERED
        if (!resUsername[0]) {
          return res.status(200).send({ status: "WRONG_USER", message: "Username not found!" });
        }

        // === IF USERNAME NOT VERIFIED
        sql = `SELECT username, verified FROM users WHERE username='${username}' AND verified='false'`;
        mysqldb.query(sql, (err, resVerif) => {
          if (err) res.status(500).send(err);

          // if (resVerif[0]) {
          //   res.status(200).send({ status: "UNVERIFIED" });
          // }

          password = encrypt(password);
          sql = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
          mysqldb.query(sql, (err, resUser) => {
            if (err) res.status(500).send(err);

            // === IF PASSWORD WRONG
            if (!resUser[0]) {
              return res.status(200).send({ status: "WRONG_PASS", message: "Password incorrect!" });

              // === ALL SEEMS GOOD!
            } else {
              // === UPDATE LAST LOGIN

              let lastlogin = moment().format("YYYY-MM-DD HH:mm:ss");
              sql = `UPDATE users SET ? WHERE id=${resUser[0].id}`;
              mysqldb.query(sql, { lastlogin }, (err, resLastlogin) => {
                if (err) res.status(500).send(err);

                // === GET NEWEST USER DATA
                sql = `SELECT id, name, username, role, email FROM users WHERE id=${resUser[0].id}`;
                mysqldb.query(sql, (err, userdata) => {
                  if (err) res.status(500).send(err);

                  const token = createJWTToken({ id: userdata[0].id, role: userdata[0].role });
                  // console.log("masuk");
                  return res.status(200).send({ status: "LOGIN_SUCCESS", token, result: userdata[0] });
                  // console.log("LOGGED IN", userdata[0]);
                });
              });
            }
          });
        });
      });
    } else if (id) {
      let sql = `SELECT id, name, username, role, email FROM users WHERE id=${id}`;
      mysqldb.query(sql, (err, relogin) => {
        if (err) res.status(500).send(err);

        // === KEEP SESSION LOGIN
        const token = createJWTToken({ id: relogin[0].id, role: relogin[0].role });
        return res.status(200).send({ status: "LOGIN_SUCCESS", token, result: relogin[0] });
      });
    } else {
      return res.status(200).send({ status: "WRONG_FORM", message: "All input must be filled!" });
    }
  },

  register: (req, res) => {
    let { secret, name, username, email, password, password2 } = req.body;

    console.log("secret", secret);

    let sql = `SELECT username FROM users WHERE username = '${username}'`;
    mysqldb.query(sql, (err, resUname) => {
      if (err) res.status(200).send(err);

      // === ALL INPUT MUST BE FILLED
      if (!name || !username || !email || !password || !password2) {
        return res.status(200).send({ status: "WRONG_FORM", message: "All input must be filled!" });
      }

      // === IF SECRET KEY IS WRONG
      if (secret !== "reg") {
        return res.status(200).send({ status: "WRONG_SECRET", message: "Secret code is wrong!" });
      }

      // === IF USERNAME ALREADY REGISTERED
      else if (resUname[0]) {
        return res.status(200).send({ status: "WRONG_USER", message: "Username not available!" });
      }

      // === IF PASSWORD DOESN'T MATCH
      else if (password !== password2) {
        return res.status(200).send({ status: "WRONG_PASS", message: "Password doesn't match!" });
      }

      // === IF EVERYTHING ARE GOOD TO GO!
      else {
        let newUser = {
          name,
          username,
          email,
          password: encrypt(password2),
          role: "admin",
          lastlogin: moment().format("YYYY-MM-DD HH:mm:ss")
        };

        // console.log("REG_SUCCESS", newUser);

        sql = `INSERT INTO users SET ?`;
        mysqldb.query(sql, newUser, (err, resNewUser) => {
          if (err) res.status(200).send(err);

          return res.status(200).send({ status: "REG_SUCCESS" });
        });
      }
    });
  }
};

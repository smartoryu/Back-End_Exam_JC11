const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "kenang",
  password: "bahagia",
  database: "exam_api",
  port: 3306
});

module.exports = db;

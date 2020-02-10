const { mysqldb } = require("../database");

module.exports = {
  getCategory: (req, res) => {
    let { name } = req.query;
    let { id } = req.params;

    if (name) {
      let sql = `SELECT * FROM categories WHERE name = '${name}'`;
      mysqldb.query(sql, (err, result) => {
        if (err) res.status(500).send(err);

        if (result[0]) {
          res.status(200).send(result);
        } else {
          res.status(200).send("Category not found!");
        }
      });
    } else if (id) {
      let sql = `SELECT * FROM categories WHERE id = ${id}`;
      mysqldb.query(sql, (err, result) => {
        if (err) res.status(500).send(err);

        if (result[0]) {
          res.status(200).send(result);
        } else {
          res.status(200).send("Category not found!");
        }
      });
    } else {
      let sql = `SELECT * FROM categories`;
      mysqldb.query(sql, (err, result) => {
        if (err) res.status(500).send(err);
        console.log(result[0]);

        if (result[0]) {
          res.status(200).send(result);
        } else {
          res.status(200).send("Category not found!");
        }
      });
    }
  },

  addCategory: (req, res) => {
    let category = req.body;

    console.log(category);

    if (category.length > 0) {
      let sql = `INSERT INTO categories SET ?`;
      mysqldb.query(sql, category, (err, result) => {
        if (err) res.status(500).send(err);

        return res.status(200).send({ result, message: "Category added!" });
      });
    } else {
      return res.status(200).send("Insert data first!");
    }
  },

  editCategory: (req, res) => {
    let newCategory = req.body;
    let { id } = req.params;

    let sql = `UPDATE categories SET ? where id=${id}`;
    mysqldb.query(sql, newCategory, (err, result) => {
      if (err) res.status(500).send(err);

      return res.status(200).send({ result, message: "Category edited!" });
    });
  },

  deleteCategory: (req, res) => {
    let { id } = req.params;

    let sql = `DELETE FROM categories where id = ${id}`;
    mysqldb.query(sql, (err, result) => {
      if (err) res.status(500).send(err);

      return res.status(200).send({ result, message: "Category deleted!" });
    });
  }
};

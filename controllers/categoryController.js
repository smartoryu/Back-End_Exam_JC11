const { mysqldb } = require("../database");

module.exports = {
  getCategory: (req, res) => {
    const limit = parseInt(req.query.limit) || 5;

    // GET THE SUM OF DATA TO COUNT A PAGES
    let sql = `SELECT id, name FROM categories`;
    mysqldb.query(sql, (err, all) => {
      if (err) res.status(500).send(err);
      const pagesCount = Math.ceil(all.length / limit);

      return res.status(200).send({ pagesCount, result: all });
    });
  },

  searchCategory: (req, res) => {
    let { search } = req.query;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit) || 5;

    // GET THE SUM OF DATA TO COUNT A PAGES
    let sql = `SELECT id FROM categories WHERE name LIKE '%${search}%'`;
    mysqldb.query(sql, (err, all) => {
      if (err) res.status(500).send(err);
      const pagesCount = Math.ceil(all.length / limit);
      const startIndex = (page - 1) * limit;

      // FOR SEARCH GET, BUT STILL USING PAGINATION
      let sql = `SELECT * FROM categories WHERE name LIKE '%${search}%' ORDER BY id LIMIT ${startIndex}, ${limit}`;
      mysqldb.query(sql, (err, resSearch) => {
        if (err) res.status(500).send(err);

        // console.log("page", pagesCount);
        // console.log("limit", limit);
        // console.log("res", resSearch);

        return res.status(200).send({ pagesCount, limit, results: resSearch });
      });
    });
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
  },
};

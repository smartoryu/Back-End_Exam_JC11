const { mysqldb } = require("../database");

module.exports = {
  getMovcat: (req, res) => {
    let sql = `SELECT m.name AS 'Movie Name', c.name AS 'Category Name' FROM movies m INNER JOIN movcat mc ON m.id=mc.idmovie INNER JOIN categories c ON mc.idcategory=c.id;`;
    mysqldb.query(sql, (err, result) => {
      if (err) res.status(500).send(err);

      if (result[0]) {
        res.status(200).send(result);
      } else {
        res.status(200).send("Data not found");
      }
    });
  },

  addMovcat: (req, res) => {
    let movcat = req.body;

    console.log(movcat);

    if (movcat) {
      let sql = `INSERT INTO movcat SET ?`;
      mysqldb.query(sql, movcat, (err, result) => {
        if (err) res.status(500).send(err);

        return res.status(200).send({ result, message: "Movcat added!" });
      });
    } else {
      return res.status(200).send("Insert data first!");
    }
  },

  deleteMovcat: (req, res) => {
    let { id } = req.params;

    let sql = `DELETE FROM movcat where id = ${id}`;
    mysqldb.query(sql, (err, result) => {
      if (err) res.status(500).send(err);

      return res.status(200).send({ result, message: "Movcat deleted!" });
    });
  }
};

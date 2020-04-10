const { mysqldb } = require("../database");

module.exports = {
  getMovcat: (req, res) => {
    let sql = `SELECT m.name AS 'Movie Name', c.name AS 'Category Name' FROM movies m INNER JOIN movcat mc ON m.id=mc.idmovie INNER JOIN categories c ON mc.idcategory=c.id ORDER BY mc.idmovie;`;
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

    if (movcat) {
      let sql = `INSERT IGNORE INTO movcat SET ?`;
      mysqldb.query(sql, movcat, (err, resEdit) => {
        if (err) res.status(500).send(err);

        let sql = `SELECT m.name AS 'Movie Name', c.name AS 'Category Name' FROM movies m INNER JOIN movcat mc ON m.id=mc.idmovie INNER JOIN categories c ON mc.idcategory=c.id ORDER BY mc.idmovie;`;
        mysqldb.query(sql, (err, result) => {
          if (err) res.status(500).send(err);

          return res.status(200).send({ message: "Movcat added!", result });
        });
      });
    } else {
      return res.status(200).send("Insert data first!");
    }
  },

  deleteMovcat: (req, res) => {
    let { idmovie, idcategory } = req.body;

    if (idmovie && idcategory) {
      let sql = `DELETE FROM movcat WHERE idmovie = ${idmovie} AND idcategory = ${idcategory}`;
      mysqldb.query(sql, (err, resDelete) => {
        if (err) res.status(500).send(err);

        let sql = `SELECT m.name AS 'Movie Name', c.name AS 'Category Name' FROM movies m INNER JOIN movcat mc ON m.id=mc.idmovie INNER JOIN categories c ON mc.idcategory=c.id ORDER BY mc.idmovie;`;
        mysqldb.query(sql, (err, result) => {
          if (err) res.status(500).send(err);

          return res.status(200).send({ message: "Movcat deleted!", result });
        });
      });
    } else {
      return res.status(200).send("Insert idmovie & idcategory first!");
    }
  }
};

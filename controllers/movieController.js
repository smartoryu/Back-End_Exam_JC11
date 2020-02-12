const { mysqldb } = require("../database");

module.exports = {
  getMovie: (req, res) => {
    let { name } = req.query;
    let { id } = req.params;
    const page = parseInt(req.query.page);
    const limit = 5;

    if (page) {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const next = { page: page + 1, limit };
      const previous = { page: page - 1, limit };

      let sql = `SELECT * FROM movies ORDER BY id LIMIT ${startIndex}, ${endIndex}`;
      mysqldb.query(sql, (err, result) => {
        if (err) res.status(500).send(err);

        if (endIndex < result[0].length && startIndex > 0) {
          return res.status(200).send({ next, previous, results: result });
        } else if (startIndex > 0) {
          return res.status(200).send({ previous, results: result });
        } else {
          return res.status(200).send({ next, results: result });
        }
      });
    } else if (name) {
      let sql = `SELECT * FROM movies WHERE name = '${name}'`;
      mysqldb.query(sql, (err, result) => {
        if (err) res.status(500).send(err);

        if (result[0]) {
          res.status(200).send(result[0]);
        } else {
          res.status(200).send("Movie not found!");
        }
      });
    } else if (id) {
      let sql = `SELECT * FROM movies WHERE id = ${id}`;
      mysqldb.query(sql, (err, result) => {
        if (err) res.status(500).send(err);

        if (result[0]) {
          res.status(200).send(result);
        } else {
          res.status(200).send("Movie not found!");
        }
      });
    } else {
      let sql = `SELECT * FROM movies`;
      mysqldb.query(sql, (err, result) => {
        if (err) res.status(500).send(err);

        if (result[0]) {
          res.status(200).send(result);
        } else {
          res.status(200).send("Movie not found!");
        }
      });
    }
  },

  addMovie: (req, res) => {
    let movie = req.body;
    console.log(movie);

    if (movie) {
      let sql = `INSERT INTO movies SET ?`;
      mysqldb.query(sql, movie, (err, result) => {
        if (err) res.status(500).send(err);

        return res.status(200).send({ message: "Movie added!", result });
      });
    } else {
      return res.status(200).send("Insert data movie first!");
    }
  },

  editMovie: (req, res) => {
    let newMovie = req.body;
    let { id } = req.params;

    let sql = `UPDATE movies SET ? where id=${id}`;
    mysqldb.query(sql, newMovie, (err, result) => {
      if (err) res.status(500).send(err);

      return res.status(200).send({ result, message: "Movie edited!" });
    });
  },

  deleteMovie: (req, res) => {
    let { id } = req.params;

    let sql = `DELETE FROM movies where id = ${id}`;
    mysqldb.query(sql, (err, result) => {
      if (err) res.status(500).send(err);

      return res.status(200).send({ result, message: "Movie deleted!" });
    });
  }
};

var express = require("express");
var router = express.Router();
var con = require("../config/dbConfig");

/* GET home page. */
router.post("/", function (req, res, next) {
  const sql = `SELECT * FROM krahebautorise WHERE numero = "${req.body.num}" AND serie = "${req.body.serie}" `;
  con.query(sql, function (err, results) {
    if (err) {
      console.log("err");
      res.json({ err: err });
    } else {
      if (results.length > 0) {
        const sql = `INSERT INTO autorisesdakhlou(idcar) VALUES (${results[0].id})`;
        con.query(sql, function (err, results) {
          if (err) {
            console.log("err");
            res.json({ err: err });
          } else {
            // code ba3then signal besh beb yethala
          }
        });
      } else {
        const sql = `INSERT INTO krahebnonautorises(serie, num) VALUES ("${req.body.num}" , "${req.body.serie}")`;
        con.query(sql, function (err, results) {
          if (err) {
            console.log("err");
            res.json({ err: err });
          }
        });
      }
    }
  });
  res.send(true);
});

module.exports = router;

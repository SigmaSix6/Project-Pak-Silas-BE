const express = require("express");
const router = express.Router();
const { con } = require("../configs/connection");

router.get("/", function (req, res, next) {
  res.status(200).send("API Conenction Works!");
});

router.get("/bank", function (req, res, next) {
  con.query("SELECT * FROM bank_code", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/employee", function (req, res, next) {
  con.query("SELECT * FROM manpower_data", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/expedition", function (req, res, next) {
  con.query("SELECT * FROM expedition_name", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/bank-code", function (req, res, next) {
  con.query("SELECT * FROM bank_code", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/bank-name", function (req, res, next) {
  con.query("SELECT * FROM bank_name", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

module.exports = router;

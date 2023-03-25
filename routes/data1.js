const express = require("express");
const mysql = require("mysql");
const router = express.Router();

let data;

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

con.connect(function (err) {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

con.query("SELECT * FROM bank_code", (err, rows, fields) => {
  if (err) throw err;
  data = rows;
});

router.get("/", function (req, res, next) {
  res.send(data);
});

module.exports = router;

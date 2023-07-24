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

router.get("/bu-code", function (req, res, next) {
  con.query("SELECT * FROM bu_code", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/supplier-data", function (req, res, next) {
  con.query("SELECT * FROM `supplier_data` ORDER BY `supp_name` ASC", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/project-number", function (req, res, next) {
  con.query("SELECT * FROM `project_number` ORDER BY `PN_proj_numb` DESC", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/element", function (req, res, next) {
  con.query("SELECT * FROM `element` ORDER BY `Ele_desc` ASC", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.post("/insert-payment-req", function (req, res, next) {
  // console.log(req.body);
  console.log(typeof req.body.request_date);
  const query = "INSERT INTO payment_requisition (name, address) VALUES ('Michelle', 'Blue Village 1')";
  // console.log(res);
  // con.query("SELECT * FROM `element` ORDER BY `Ele_desc` ASC", (err, rows, fields) => {
  //   if (err) throw err;
  //   res.send(rows);
  // });
});

module.exports = router;

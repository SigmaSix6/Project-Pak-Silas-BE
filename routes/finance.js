const express = require("express");
const router = express.Router();
const { con } = require("../configs/connection");

const convertDateToSql = (data) => {
  data = data.toISOString().slice(0, 19).replace("T", " ");
};

router.get("/", function (req, res, next) {
  res.status(200).send("API Conenction Works!");
});

router.get("/bank", function (req, res, next) {
  con.execute("SELECT * FROM bank_code", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/employee", function (req, res, next) {
  con.execute("SELECT * FROM manpower_data", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/expedition", function (req, res, next) {
  con.execute("SELECT * FROM expedition_name", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/bank-code", function (req, res, next) {
  con.execute("SELECT * FROM bank_code", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/bank-name", function (req, res, next) {
  con.execute("SELECT * FROM bank_name", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/bu-code", function (req, res, next) {
  con.execute("SELECT * FROM bu_code", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/supplier-data", function (req, res, next) {
  con.execute("SELECT * FROM `supplier_data` ORDER BY `supp_name` ASC", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/project-number", function (req, res, next) {
  con.execute("SELECT * FROM `project_number` ORDER BY `PN_proj_numb` DESC", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/element", function (req, res, next) {
  con.execute("SELECT * FROM `element` ORDER BY `Ele_desc` ASC", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.post("/insert-payment-req", async (req, res, next) => {
  // console.log(req.body);
  let res1;
  await con
    .execute(
      "INSERT INTO `payment_requisition` (`PR_numb`, `PR_supp_name`, `PR_supp_number`, `PR_dept_numb`, `PR_req_date`, `PR_type_pay`, `PR_mode_pay`, `PR_proj_numb`, `PR_PO_numb`, `PR_amt_idr_tot`, `PR_amt_usd_tot`, `PR_tax_usd_tot`, `PR_tax_idr_tot`, `PR_effec_date`, `PR_alloc_dept`, `PR_ele_req`, `PR_finc_issue_date`, `PR_finc_recv_inv`, `PR_supp_inv_numb`, `PR_finc_bank_doc`, `PR_finc_bank_n_b`, `PR_finc_bank_n_g`, `PR_finc_date_paid`, `PR_amt_tsf_fee`, `PR_amt_tot_all_idr`, `Comp_code_pr`) VALUES (NULL, 'aaa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL); ",
      (err, rows, fields) => {
        if (err) throw err;
        console.log("Success");
        res1 = rows;
      }
    )
    .then(
      async (success) => {
        await con.execute(
          `INSERT INTO 'payment_requisition_detail' ('id', 'pr_req_desc', 'pr_amt_idr', 'pr_amt_usd', 'pr_tax', 'pr_tax_usd', 'pr_tax_idr', 'pr_amt_curr', 'pr_type_curr', 'pr_amt_tot_idr') VALUES ('${res1.insertId}', 'ASD', '', '', '', '', '', '', '', '')`
        );
      },
      async (reject) => {}
    );
});

module.exports = router;

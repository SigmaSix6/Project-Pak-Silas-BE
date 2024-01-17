const express = require("express");
const router = express.Router();
const { con } = require("../../configs/connection");

router.get("/project-number-report", function (req, res, next) {
  con.execute(
    `SELECT PN_proj_numb,PN_cust_code,PN_originator,PN_cont_numb,PN_proj_date,PN_proj_desc,PN_val_idr,PN_val_usd,PN_proj_curr,PN_closed_date FROM project_number WHERE 1 LIMIT 10`,
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
        return false;
      }
      res.status(200).send(rows);
      return true;
    }
  );
});

router.get("/payment-po-report", function (req, res, next) {
  con.execute(
    `SELECT PO_proj_numb,PO_supp_name,PN_Cust_Nama,PO_dept_numb,PO_PO_Numb,PO_req_date,PO_finc_issue FROM payment_po INNER JOIN project_number ON payment_po.PO_proj_numb = project_number.PN_proj_numb WHERE 1 LIMIT 10`,
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
        return false;
      }
      res.status(200).send(rows);
      return true;
    }
  );
});

router.get("/income-sales-report", function (req, res, next) {
  con.execute(`SELECT * FROM invoices_coming WHERE CR_ele_recp LIKE 'Sales Income' LIMIT 10`, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
      return false;
    }
    res.status(200).send(rows);
    return true;
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { con } = require("../configs/connection");

const convertDateToSql = (data) => {
  return data.slice(0, 19).replace("T", " ");
};

router.get("/", function (req, res, next) {
  res.status(200).send("API Conenction Works!");
});

router.get("/employee", function (req, res, next) {
  con.execute("SELECT * FROM manpower_data", (err, rows, fields) => {
    if (err) throw err;
    res.status(200).send(rows);
  });
});

router.get("/expedition", function (req, res, next) {
  con.execute("SELECT * FROM expedition_name", (err, rows, fields) => {
    if (err) throw err;
    res.status(200).send(rows);
  });
});

router.get("/bank-code", function (req, res, next) {
  con.execute("SELECT * FROM bank_code", (err, rows, fields) => {
    if (err) throw err;
    res.status(200).send(rows);
  });
});

router.get("/bank-name", function (req, res, next) {
  con.execute("SELECT * FROM bank_name ORDER BY `bank_name` ASC", (err, rows, fields) => {
    if (err) throw err;
    res.status(200).send(rows);
    return true;
  });
});

router.get("/bu-code", function (req, res, next) {
  con.execute("SELECT * FROM bu_code", (err, rows, fields) => {
    if (err) throw err;
    res.status(200).send(rows);
  });
});

router.get("/supplier-data", function (req, res, next) {
  con.execute("SELECT * FROM `supplier_data` ORDER BY `supp_name` ASC", (err, rows, fields) => {
    if (err) throw err;
    res.status(200).send(rows);
  });
});

router.get("/project-number", function (req, res, next) {
  con.execute("SELECT * FROM `project_number` ORDER BY `PN_proj_numb` DESC", (err, rows, fields) => {
    if (err) throw err;
    res.status(200).send(rows);
  });
});

router.get("/element", function (req, res, next) {
  con.execute("SELECT * FROM `element` ORDER BY `Ele_desc` ASC", (err, rows, fields) => {
    if (err) throw err;
    res.status(200).send(rows);
  });
});

router.post("/insert-payment-req", async (req, res, next) => {
  const data = req.body;
  // data.request_date = convertDateToSql(data.request_date);
  con.execute(
    `INSERT INTO payment_requisition (PR_numb, PR_supp_name, PR_supp_number, PR_dept_numb, PR_req_date, PR_type_pay, PR_mode_pay, PR_proj_numb, PR_PO_numb, PR_amt_idr_tot, PR_amt_usd_tot, PR_tax_usd_tot, PR_tax_idr_tot, PR_effec_date, PR_alloc_dept, PR_ele_req, PR_finc_issue_date, PR_finc_recv_inv, PR_supp_inv_numb, PR_finc_bank_doc, PR_finc_bank_n_b, PR_finc_bank_n_g, PR_finc_date_paid, PR_amt_tsf_fee, PR_amt_tot_all_idr, Comp_code_pr) VALUES (NULL, '${data.supplier_name}', '${data.supplier_number}', '${data.department_number}', '${data.request_date}', '${data.type_payment}', '${data.mode_payment}', '${data.project_number}', '${data.po_number}', '${data.total_idr}', '${data.total_currency}', '${data.tax_idr}', '${data.tax_currency}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL); `,
    (err, rows, fields) => {
      if (err) throw err;
      // console.log("Success");
      for (let i = 1; i <= data.detailLength; i++) {
        con.execute(
          `INSERT INTO payment_requisition_detail (id, pr_req_desc, pr_amt_idr, pr_amt_usd, pr_tax, pr_tax_usd, pr_tax_idr, pr_amt_curr, pr_type_curr, pr_amt_tot_idr) VALUES ('${
            rows.insertId
          }', '${data[`purpose_req_${i}`] ?? ``}', '${data[`amount_${i}`] ?? ``}', '${data[`curr_${i}`] ?? ``}', '${data[`tax_${i}`] ?? ``}', '${
            rows.insertId
          }', '${rows.insertId}', '${rows.insertId}', '${rows.insertId}', '${rows.insertId}') `,
          (err, rows, fields) => {
            if (err) throw err;
            console.log(rows);
            res.status(200).send(rows);
            return true;
          }
        );
      }
    }
  );
});

router.post("/insert-cash-adv", async (req, res, next) => {
  const data = req.body;
  con.execute(
    `INSERT INTO cash_advance(CA_ID_Numb, CA_supp_name, CA_supp_numb, CA_dept_numb, CA_proj_numb, CA_req_date, CA_type_pay, CA_mode_pay, CA_req_desc, CA_effec_date, CA_cheque_no, CA_amt_usd, CA_amt_idr, CA_amt_say, CA_finance_prog_date, CA_finance_notice, CA_alloc_dept, CA_element, CA_balance_amt, CA_balance_amt_curr, CA_return_to_cash, CA_return_to_cash_curr, CA_date_in_site, CA_date_out_site, CA_total_empl_on_duty, CA_amt_ticket, CA_amt_airport_tax, CA_amt_taxi, CA_amt_meal, CA_amt_accom, CA_amt_park_toll, CA_amt_doc, CA_amt_fee_comn, CA_amt_purch_mat, CA_amt_sent_mat, CA_amt_rental_car, CA_amt_fuel, CA_amt_telp_voucher, CA_amt_other1, CA_amt_other2, CA_amt_other3, CA_amt_other4, CA_amt_other5, CA_no_amt_ticket, CA_no_amt_airport_tax, CA_no_amt_taxi, CA_no_amt_meal, CA_no_amt_accom, CA_no_amt_park_toll, CA_no_amt_doc, CA_no_amt_fee_comn, CA_no_amt_purch_mat, CA_no_amt_sent_mat, CA_no_amt_rental_car, CA_no_amt_fuel, CA_no_amt_telp_voucher, CA_no_amt_other1, CA_no_amt_other2, CA_no_amt_other3, CA_no_amt_other4, CA_no_amt_other5, P_currency, P_Curr_accom, P_Curr_ticket, P_Curr_meal, P_Curr_enter, P_Curr_taxi, P_Curr_other, CA_status, Curr_amt, Comp_code_ca) VALUES ('[value-1]','${data.employee_name}','${data.employee_number}','${data.department_no}','${data.project_number}','${data.requisition_date}','${data.type_payment}','${data.mode_payment}','${data.purpose_of_request}','[effec_date]','[cheque_no]','${data.total_idr_request}','${data.total_currency_request}','${data.plan_date_on_field}','${data.plan_date_out_field}','${data.total_manpower_duty}','${data.department_user}','${data.element_allocation}','balance_amount','balance_amount_curr','return_to_cash','date_in_site','date_out_site','total_empl_on_duty','${data.ticket_airplane_tram}','${data.airport_tax}','${data.taxi}','${data.meal}','${data.accomodation}','${data.park_toll}','${data.documentation}','${data.fee_comission}','${data.local_material_purchase}','${data.material_delivery}','${data.rental_car}','${data.fuel}','${data.telephone_voucher}','${data.others_1}','${data.others_2}','${data.others_3}','${data.others_4}','${data.others_5}','${data.no_ticket_airplane_tram}','${data.no_airport_tax}','${data.no_taxi}','${data.no_meal}','${data.no_accomodation}','${data.no_park_toll}','${data.no_documentation}','${data.no_fee_comission}','${data.no_local_material_purchase}','${data.no_material_delivery}','${data.no_rental_car}','${data.no_fuel}','${data.no_telephone_voucher}','${data.no_others_1}','${data.no_others_2}','${data.no_others_3}','${data.no_others_4}','${data.no_others_5}','${data.foreign_accomodation}','${data.foreign_ticket_airplane}','${data.foreign_meal}','${data.foreign_entertainment}','${data.foreign_taxi}','${data.foreign_other}','[value-67]','[value-68]','[value-69]','[value-70]','[value-71]')`,
    (err, rows, fields) => {
      if (err) throw err;
      console.log(rows);
      res.status(200).send(rows);
      return true;
    }
  );
});

router.post("/insert-bank-activity", async (req, res, next) => {
  const data = req.body;
  // data.request_date = convertDateToSql(data.request_date);
  con.execute(
    `INSERT INTO bank_activity (bank_name, date_transaction, bank_remark, bank_code, bank_curr, bank_deposit_idr, bank_withdrawal_idr, bank_deposit_usd, bank_withdrawal_usd, cheque, finance_description, comp_code_ba, bank_deposit_eur, bank_withdrawal_eur) VALUES ( '${data.bank_name}', '${data.transaction_date}', '${data.remarks}', NULL, '${data.transaction_code}', '${data.currency_type}', '${data.deposit_idr}', '${data.withdrawal_idr}', '${data.deposit_usd}', '${data.withdrawal_usd}', NULL, '${data.finance_description}', NULL, NULL)`,
    (err, rows, fields) => {
      if (err) throw err;
      console.log(rows);
      res.status(200).send(rows);
      return true;
    }
  );
});

router.post("/insert-supplier", async (req, res, next) => {
  const data = req.body;
  // data.request_date = convertDateToSql(data.request_date);
  con.execute(
    `INSERT INTO supplier_data (supp_name, supp_number, supp_address, supp_contact_name, supp_phone_numb) VALUES ( '${data.supplier_name}', '${data.supplier_number}', '${data.address}', '${data.contact_name}', '${data.phone_number}')`,
    (err, rows, fields) => {
      if (err) throw err;
      console.log(rows);
      res.status(200).send(rows);
      return true;
    }
  );
});

router.post("/insert-payment-order", async (req, res, next) => {
  const data = req.body;
  // data.request_date = convertDateToSql(data.request_date);
  console.log(data.supplier_name);
  con.execute(
    `INSERT INTO payment_po (PO_numb, PO_PO_Numb, PO_supp_name, PO_supp_numb, PO_proj_numb, PO_dept_numb, PO_req_date, PO_type_pay, PO_mode_pay, PO_type, PO_req_desc, PO_supp_inv_numb, PO_inv_rec_date, PO_amt_usd, PO_amt_idr, PO_amt_curr_t, PO_tax_y_n, PO_tax_usd, PO_tax_idr, PO_finc_effec_date, PO_finc_issue, PO_finc_amt_tsf_fee, PO_finc_amt_oth_fee, PO_amt_tot_usd, PO_amt_curr, PO_amt_tot_idr, PO_amt_all_tot_idr, PO_finc_bank_doc, PO_finc_bank_n_b, PO_finc_bank_n_g, PO_amt_all_tot_idr2, Comp_code_po) VALUES ('','${data.po_number}','${data.supplier_name}','${data.supplier_number}','${data.project_number}','${data.department_number}','${data.request_date}','${data.type_payment}','${data.mode_payment}','${data.po_type}','${data.po_description}','${data.supplier_inv_number}','${data.inv_date_received}','${data.po_amount_currency}','${data.po_amount_idr}','[value-16]','[value-17]','[value-18]','[value-19]','[value-20]','[value-21]','[value-22]','[value-23]','[value-24]','[value-25]','[value-26]','[value-27]','[value-28]','[value-29]','[value-30]','[value-31]','[value-32]')`,
    (err, rows, fields) => {
      if (err) throw err;
      console.log(rows);
      res.status(200).send(rows);
      return true;
    }
  );
});

module.exports = router;

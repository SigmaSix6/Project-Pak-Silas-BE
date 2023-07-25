const mysql = require("mysql2");

const con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "simoco",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  multipleStatements: true,
});

con.getConnection(function (err, res) {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

module.exports = { con };

import mysql from "mysql2/promise"
const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

connection.query("SELECT 1+1").on("result", function (row) {
  console.log(row);
});

export default connection;
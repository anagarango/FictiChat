import mysql from "mysql2/promise"
const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user:  'root',
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
});
export default connection;
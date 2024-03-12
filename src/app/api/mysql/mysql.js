import mysql from "mysql2/promise"
const connection = mysql.createConnection({
  host: process.env.HOST,
  user:  'root',
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
export default connection;
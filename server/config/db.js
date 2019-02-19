const Mysql = require("mysql2/promise");
const Pool = Mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "1103",
  database: "meng"
});

module.exports = Pool;

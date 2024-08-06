const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',          // Default XAMPP MySQL user is 'root'
  password: '',          // Default XAMPP MySQL password is empty
  database: 'authapp',
});

const promisePool = pool.promise();

module.exports = promisePool;

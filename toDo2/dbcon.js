var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'todo',
  password        : 'bob123',
  database        : 'TODO'
  ,dateStrings:true
});

module.exports.pool = pool;

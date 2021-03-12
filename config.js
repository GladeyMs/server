import mysql from 'mysql'

const connection =  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'customer_db',
  multipleStatements: true,
})

module.exports = connection
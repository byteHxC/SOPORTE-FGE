// configuracion de la base de datos
const mysql = require('mysql');
module.exports = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'sistemas123',
	database: 'test_login',
	port: 3306
});
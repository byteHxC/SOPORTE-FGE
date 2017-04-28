const db = require('../../config/database');

// GET /equipo
exports.equipo = function (req, res){
	console.log('GET /equipo');
	res.send('En desarrollo');
}

// POST /equipo
exports.agregarEquipo = function (req, res){
	console.log('POST /equipo');
	res.send('En desarrollo');
}

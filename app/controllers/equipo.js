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


// API - EQUIPO
exports.buscarPor = function (req, res){
	console.log('GET/api/equipo/:filtro/:valor ');
	if(req.params.filtro == 'numero_serie'){
		db.query("select * from cat_equipo join cat_tipo_equipo on cat_equipo.id_tipo_equipo=cat_tipo_equipo.id_tipo_equipo where cat_equipo.numero_serie like '%"+req.params.valor+"%'", function(error, rows){
			var equipos = JSON.parse(JSON.stringify(rows));
            res.status(200).json(equipos);
		});
	}else if(req.params.filtro == 'clave_inventarial'){
		db.query("select * from cat_equipo join cat_tipo_equipo on cat_equipo.id_tipo_equipo=cat_tipo_equipo.id_tipo_equipo where cat_equipo.clave_inventarial like '%"+req.params.valor+"%'", function(error, rows){
			var equipos = JSON.parse(JSON.stringify(rows));
            res.status(200).json(equipos);
		});
	}
	
}


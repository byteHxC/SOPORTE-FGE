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
// get equipo por ID
exports.detallesEquipo = (req, res) =>{
	console.log('GET /api/equipo/:id_equipo');
	data = {}
	db.query("select cat_equipo.id_equipo,cat_tipo_equipo.nombre as tipo_equipo, cat_equipo.marca, cat_equipo.modelo, cat_equipo.numero_serie, cat_equipo.clave_inventarial, cat_equipo.disco_duro, cat_equipo.sistema_operativo, cat_equipo.memoria_ram, cat_equipo.procesador, cat_equipo.observaciones from cat_equipo join cat_tipo_equipo on cat_equipo.id_tipo_equipo=cat_tipo_equipo.id_tipo_equipo where cat_equipo.id_equipo=?;", [req.params.id_equipo], (err, rows) => {
		data['equipo'] = JSON.parse(JSON.stringify(rows[0]))
		db.query("select reporte.folio, reporte.folio_formato, reporte.diagnostico_equipo, reporte.reparado,reporte.instalado_en_ubicacion, date_format(reporte.fecha_entrega,'%e/%m/%Y %r') as reporte_fecha_entrega, usuario.nombre, date_format(solicitud.fecha,'%e/%m/%Y %r') as solicitud_fecha, solicitud.descripcion_problema from reporte join notificacion_solicitud on notificacion_solicitud.id_solicitud = reporte.id_solicitud join usuario on notificacion_solicitud.id_usuario_soporte  = usuario.id_usuario join solicitud on solicitud.id_solicitud = reporte.id_solicitud where reporte.id_equipo = ?;",[req.params.id_equipo], (err, rows) => {
			//console.log('entraaa'+ JSON.parse(JSON.stringify(rows)));
			data['historial'] = JSON.parse(JSON.stringify(rows));
			res.status(200).json(data);
		});
	});	
}

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


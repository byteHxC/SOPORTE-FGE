const db    = require('../../config/database'),
    fs = require('fs'),
    base64Img = require('base64-img');
var is = require( 'validator.js' ).Assert;
var validator = require( 'validator.js' ).validator();

// GET /reporte_pdf/:folio
exports.reportePDF = (req, res) => {
    console.log('GET /reporte_pdf/:folio');
    db.query('', [req.params.folio], (err, rows)=>{
        // generar pdf
        res.send('holiii');
    });
}
// GET /reporte/:folio
exports.reporte = (req, res) => {
    console.log('GET /reporte/:folio');
    data = []
    db.query('', [req.params.folio] , (err, rows)=>{
        reporte = JSON.parse(JSON.stringify(rows[0]));
        data['reporte'] = reporte;
        getNumeroSolicitudes(req.user.id_usuario, (row)=>{
            data['notificaciones'] = row;
            res.render('soporte/detalle_reporte', data);
        });
    });
}
// GET /reportes
exports.reportes = function (req, res){
	console.log('GET /reportes');
	data = []
	db.query('select * from reporte join cat_tipo_reparacion on reporte.id_tipo_reparacion=cat_tipo_reparacion.id_tipo_reparacion;', function(err, rows){
		reportes = JSON.parse(JSON.stringify(rows));
		data['reportes'] = reportes;
		getNumeroSolicitudes(req.user.id_usuario, function(row){
            data['notificaciones'] = row;
			res.render('soporte/reportes', data);
        });
	});
}

// GET /equipo/entrega/:folio
exports.equipoEntrega = (req, res) => {
    console.log('GET /equipo/entrega/:folio');
    data = []
    getNumeroSolicitudes(req.user.id_usuario, function(row){
        data['notificaciones'] = row;
        data['folio'] = req.params.folio;
        res.render('soporte/entregaEquipo', data);
    });
}

// POST /equipo/entrega/
exports.equipoEntregaRegistrar = (req, res) => {
    console.log('POST /equipo/entrega/');
    params = []
    params.push(req.body.diagnostico_equipo);
    carpeta_respaldo = req.body.carpeta_respaldo || 'No se realizo respaldo';
    params.push(carpeta_respaldo);
    reparado = ((req.body.reparado == 'on') ? 'reparado' : 'no reparado');
    en_su_ubicacion = ((req.body.en_su_ubicacion == 'on')? 'si' : 'no');
    params.push(reparado);
    params.push(en_su_ubicacion);

    image = req.body.firma_img;
    firma_conformidad = 'firma_conformidad_'+req.body.folio+'.png';
    
    params.push(firma_conformidad);
    params.push(req.body.calificacion);
    params.push(req.body.folio);
    console.log(params);
    db.query("update reporte set fecha_entrega=CURRENT_TIMESTAMP, diagnostico_equipo=?, carpeta_respaldo=?, reparado=?, instalado_en_ubicacion=?, firma_conformidad=?, calificacion_servicio=? where folio = ?;", params, function(err, result, rows){
        if(err){
            req.flash('error', 'Error al guardar la firma');
            console.log(err);
        }else{
            data = image.replace(/^data:image\/\w+;base64,/, '');
            fs.writeFile('app/signatures/'+firma_conformidad, data, {encoding: 'base64'}, function(err){
                if(err){
                    req.flash('error', 'Error al guardar la firma');
                    console.log(err);
                }else{
                    req.flash('message', 'Entrega de equipo satisfactoria!');
                    res.redirect('/');
                }
            });
        }
    });
}

function getNumeroSolicitudes(id_usuario_soporte,callback){
        db.query("select id_usuario_soporte,count(id_notificacion) as numero_solicitudes from notificacion_solicitud where id_usuario_soporte=? and atendida='no' group by id_usuario_soporte;", [id_usuario_soporte], function(err, data){
            if(err)
                callback(err);
            else
                callback(JSON.parse(JSON.stringify(data)));
        });
    }

// API :- Reporte

exports.APIDetalleSolicitud = function (req, res){
    query = "select cat_tipo_solicitud.nombre as tipo_solicitud, solicitud.fecha as fecha_solicitud, solicitud.no_oficio as no_oficio, empleado_info.nombre as empleado_solicitante, cat_tipo_servicio.nombre as tipo_servicio, solicitud.descripcion_problema, solicitud.id_usuario_encargado as registro_solicitud, cat_tipo_reparacion.nombre as tipo_reparacion, reporte.diagnostico_equipo as diagnostico_equipo, reporte.firma_conformidad as firma_conformidad, reporte.firma_salida as firma_salida from reporte join solicitud on reporte.id_solicitud = solicitud.id_solicitud join cat_tipo_solicitud on solicitud.id_tipo_solicitud = cat_tipo_solicitud.id_tipo_solicitud join empleado_info on solicitud.id_empleado_solicitante = empleado_info.id_empleado join cat_tipo_servicio on solicitud.id_tipo_servicio = cat_tipo_servicio.id_tipo_servicio join cat_tipo_reparacion on reporte.id_tipo_reparacion = cat_tipo_reparacion.id_tipo_reparacion where solicitud.id_solicitud = ?;";
    db.query(query, [req.params.id_solicitud], function(err, rows){
        if(err){
            res.status(500).json({error: 'Error al realizar la busqueda'});
        }else{
            var solicitud = JSON.parse(JSON.stringify(rows[0]));
            res.status(200).json(solicitud);
        }
    });
}

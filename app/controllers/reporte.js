const db    = require('../../config/database'),
    fs = require('fs'),
    base64Img = require('base64-img');
var is = require( 'validator.js' ).Assert;
var validator = require( 'validator.js' ).validator();
var imageToURI = require('image-to-data-uri')


// GET /reporte/:folio
exports.reporte = (req, res) => {
    console.log('GET /reporte/:folio');
    data = []
    query = "select reporte.folio, date_format(solicitud.fecha,'%e/%m/%Y %r') as fecha_solicitud, solicitud.no_oficio, cat_tipo_solicitud.nombre as tipo_solicitud, reporte.carpeta_respaldo, empleado_info.nombre, empleado_info.telefono, empleado_info.adscripcion, empleado_info.email, cat_tipo_servicio.nombre as servicio_solicita, solicitud.descripcion_problema, cat_equipo.nombre as nombre_equipo, cat_equipo.grupo_de_trabajo, cat_equipo.marca, cat_equipo.modelo, cat_equipo.numero_serie, cat_equipo.clave_inventarial, cat_equipo.disco_duro, cat_equipo.memoria_ram, cat_equipo.sistema_operativo, cat_equipo.procesador, cat_equipo.observaciones, cat_tipo_reparacion.nombre as tipo_reparacion, reporte.firma_salida, reporte.diagnostico_equipo, reporte.reparado, date_format(reporte.fecha_entrega,'%e/%m/%Y %r') as fecha_entrega, reporte.instalado_en_ubicacion, reporte.firma_conformidad, reporte.calificacion_servicio from reporte join solicitud on reporte.id_solicitud = solicitud.id_solicitud join empleado_info on solicitud.id_empleado_solicitante=empleado_info.id_empleado join cat_tipo_solicitud on solicitud.id_tipo_solicitud = cat_tipo_solicitud.id_tipo_solicitud join cat_tipo_servicio on solicitud.id_tipo_servicio=cat_tipo_servicio.id_tipo_servicio join cat_equipo on reporte.id_equipo = cat_equipo.id_equipo join notificacion_solicitud on solicitud.id_solicitud=notificacion_solicitud.id_solicitud join cat_tipo_reparacion on reporte.id_tipo_reparacion=cat_tipo_reparacion.id_tipo_reparacion where reporte.folio = ?;"
    db.query(query, [req.params.folio] , (err, rows)=>{
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
	console.log('GET /reportes/');
    // reportes que vera el admin (falta)
    if(req.user.id_rol == 1){
        db.query('select * from reporte join cat_tipo_reparacion on reporte.id_tipo_reparacion=cat_tipo_reparacion.id_tipo_reparacion;', function(err, rows){
            reportes = JSON.parse(JSON.stringify(rows));
            res.render('administrador/reportes', reportes);
        });
    }else{
        data = []
        db.query('select * from reporte join cat_tipo_reparacion on reporte.id_tipo_reparacion=cat_tipo_reparacion.id_tipo_reparacion join notificacion_solicitud on reporte.id_solicitud = notificacion_solicitud.id_solicitud where notificacion_solicitud.id_usuario_soporte = ?;', [req.user.id_usuario], function(err, rows){
            reportes = JSON.parse(JSON.stringify(rows));
            data['reportes'] = reportes;
            getNumeroSolicitudes(req.user.id_usuario, function(row){
                data['notificaciones'] = row;
                res.render('soporte/reportes', data);
            });
        });
    }
	
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
            if(err){
                callback(err);
            }else{
                // notificaciones[0].numero_solicitudes
                if (data != ''){
                    callback(JSON.parse(JSON.stringify(data)));
                }else{
                    callback([{'numero_solicitudes': 0}]);
                }
            }
                    
        });
    }

// API :- Reporte
exports.APIDetalleSolicitud = function (req, res){
    query = "select cat_tipo_solicitud.nombre as tipo_solicitud, solicitud.fecha as fecha_solicitud, solicitud.no_oficio as no_oficio, empleado_info.nombre as empleado_solicitante, cat_tipo_servicio.nombre as tipo_servicio, solicitud.descripcion_problema, solicitud.id_usuario_encargado as registro_solicitud,usuario.nombre as usuario_encargado, cat_tipo_reparacion.nombre as tipo_reparacion, reporte.diagnostico_equipo as diagnostico_equipo, reporte.firma_conformidad as firma_conformidad, reporte.firma_salida as firma_salida from reporte join solicitud on reporte.id_solicitud = solicitud.id_solicitud join cat_tipo_solicitud on solicitud.id_tipo_solicitud = cat_tipo_solicitud.id_tipo_solicitud join empleado_info on solicitud.id_empleado_solicitante = empleado_info.id_empleado join cat_tipo_servicio on solicitud.id_tipo_servicio = cat_tipo_servicio.id_tipo_servicio join cat_tipo_reparacion on reporte.id_tipo_reparacion = cat_tipo_reparacion.id_tipo_reparacion join usuario on solicitud.id_usuario_encargado = usuario.id_usuario where solicitud.id_solicitud = ?;";
    db.query(query, [req.params.id_solicitud], function(err, rows){
        if(err){
            res.status(500).json({error: 'Error al realizar la busqueda'});
        }else{
            var solicitud = JSON.parse(JSON.stringify(rows[0]));
            res.status(200).json(solicitud);
        }
    });
}

exports.APIDetalleReporte = (req, res) => {
    console.log('GET /API/reporte/:folio');
    data = []
    query = "select reporte.folio, date_format(solicitud.fecha,'%e/%m/%Y') as fecha_solicitud, solicitud.no_oficio, cat_tipo_solicitud.nombre as tipo_solicitud, reporte.carpeta_respaldo, empleado_info.nombre, empleado_info.telefono, empleado_info.adscripcion, empleado_info.email, cat_tipo_servicio.nombre as servicio_solicita, solicitud.descripcion_problema, cat_equipo.nombre as nombre_equipo, cat_equipo.grupo_de_trabajo, cat_equipo.marca, cat_equipo.modelo, cat_equipo.numero_serie, cat_equipo.clave_inventarial, cat_equipo.disco_duro, cat_equipo.memoria_ram, cat_equipo.sistema_operativo, cat_equipo.procesador, cat_equipo.observaciones, cat_tipo_reparacion.nombre as tipo_reparacion, reporte.firma_salida, reporte.diagnostico_equipo, reporte.reparado, date_format(reporte.fecha_entrega,'%e/%m/%Y') as fecha_entrega, reporte.instalado_en_ubicacion, reporte.firma_conformidad, reporte.calificacion_servicio from reporte join solicitud on reporte.id_solicitud = solicitud.id_solicitud join empleado_info on solicitud.id_empleado_solicitante=empleado_info.id_empleado join cat_tipo_solicitud on solicitud.id_tipo_solicitud = cat_tipo_solicitud.id_tipo_solicitud join cat_tipo_servicio on solicitud.id_tipo_servicio=cat_tipo_servicio.id_tipo_servicio join cat_equipo on reporte.id_equipo = cat_equipo.id_equipo join notificacion_solicitud on solicitud.id_solicitud=notificacion_solicitud.id_solicitud join cat_tipo_reparacion on reporte.id_tipo_reparacion=cat_tipo_reparacion.id_tipo_reparacion where reporte.folio = ?;"
    db.query(query, [req.params.folio] , (err, rows)=>{
        reporte = JSON.parse(JSON.stringify(rows[0]));
        // var url = 'http://localhost:8080/images/logo.png';
        // base64Img.requestBase64(url, function(err, ress, body) {
        //     reporte['logo'] = body;
        //     res.status(200).json({logo: body});
        // });
        if(err) 
            res.status(500).json(err);
        else
            res.status(200).json(reporte);
    });
}

exports.APIReportes = (req, res) => {
    reparado = req.params.reparado || null;
    reparado = (reparado != null) ? reparado : 'true';
    reparado = (reparado == 'true') ? 'reparado' : 'no reparado';

    anio = req.params.anio || null;
    mes = req.params.mes || null;
    console.log(`GET /API/reportes/${reparado}/${anio}/${mes}`);
    
    if(req.user.id_rol == 1){ // reportes para el admin
        if(anio && mes){        
            db.query('select * from reporte join cat_tipo_reparacion on reporte.id_tipo_reparacion=cat_tipo_reparacion.id_tipo_reparacion join notificacion_solicitud on reporte.id_solicitud = notificacion_solicitud.id_solicitud join solicitud on reporte.id_solicitud=solicitud.id_solicitud where reporte.reparado=? and YEAR(solicitud.fecha) = ? and MONTH(solicitud.fecha) = ? ;', [reparado, anio, mes], function(err, rows){
                reportes = JSON.parse(JSON.stringify(rows));
                if(err)
                    res.status(500).json(err)
                else
                    res.status(200).json(reportes);
            });
        }else{
            db.query('select * from reporte join cat_tipo_reparacion on reporte.id_tipo_reparacion=cat_tipo_reparacion.id_tipo_reparacion join notificacion_solicitud on reporte.id_solicitud = notificacion_solicitud.id_solicitud where reporte.reparado=?;', [reparado], function(err, rows){
                reportes = JSON.parse(JSON.stringify(rows));
                if(err)
                    res.status(500).json(err)
                else
                    res.status(200).json(reportes);
            });
        }
    }else{
        if(anio && mes){        
            db.query('select * from reporte join cat_tipo_reparacion on reporte.id_tipo_reparacion=cat_tipo_reparacion.id_tipo_reparacion join notificacion_solicitud on reporte.id_solicitud = notificacion_solicitud.id_solicitud join solicitud on reporte.id_solicitud=solicitud.id_solicitud where notificacion_solicitud.id_usuario_soporte = ? and reporte.reparado=? and YEAR(solicitud.fecha) = ? and MONTH(solicitud.fecha) = ? ;', [req.user.id_usuario, reparado, anio, mes], function(err, rows){
                reportes = JSON.parse(JSON.stringify(rows));
                if(err)
                    res.status(500).json(err)
                else
                    res.status(200).json(reportes);
            });
        }else{
            db.query('select * from reporte join cat_tipo_reparacion on reporte.id_tipo_reparacion=cat_tipo_reparacion.id_tipo_reparacion join notificacion_solicitud on reporte.id_solicitud = notificacion_solicitud.id_solicitud where notificacion_solicitud.id_usuario_soporte = ? and reporte.reparado=?;', [req.user.id_usuario, reparado], function(err, rows){
                reportes = JSON.parse(JSON.stringify(rows));
                if(err)
                    res.status(500).json(err)
                else
                    res.status(200).json(reportes);
            });
        }
    }
    
}

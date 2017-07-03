const db    = require('../../config/database'),
    moment  = require('moment'),
    multer  = require('multer'),
    UPLOAD_PATH_SIGNATURE = '../signatures',
    fs = require('fs'),
    base64Img = require('base64-img');


var is = require( 'validator.js' ).Assert;
var validator = require( 'validator.js' ).validator();

var upload_signature = multer({dest: `${UPLOAD_PATH_SIGNATURE}`}).single('firma_img');

exports.solicitudes = function (req, res){
    console.log('GET /solicitudes/');
    db.query("select * from listar_solicitudes where id_usuario_soporte=? and atendida='no' order by case prioridad when 'alta' then 1 when 'media' then 2 when 'baja' then 3 end, fecha ", [req.user.id_usuario], function(err, rows){
        var solicitudes = JSON.parse(JSON.stringify(rows));
        getNumeroSolicitudes(req.user.id_usuario, function(row){
            //console.log(row);
            res.render('soporte/index', {solicitudes: solicitudes, notificaciones: row});
        })
        //console.log(solicitudes);
    });
    
}


// GET /solicitud/atender/:id_solicitud
exports.atender = function (req, res){
    console.log('GET /solicitud/atender/:id_solicitud');
    data = [];
    console.log(req.params.id_solicitud)
    db.query('select * from notificacion_solicitud where id_solicitud = ?;', [req.params.id_solicitud], function(err, rows){
        if(err){
            res.status(500).send("erorr al encontrar solicitud:c");
        }else{
            data['notificacion_solicitud'] = JSON.parse(JSON.stringify(rows));
            console.log(JSON.parse(JSON.stringify(rows)));
            db.query('select id_tipo_reparacion, nombre from cat_tipo_reparacion', function(err, rows){
                if(err){
                    res.status(500).send("erorr en el servidor :c");
                }else{
                    data['tipos_reparacion'] = JSON.parse(JSON.stringify(rows));
                    getNumeroSolicitudes(req.user.id_usuario, function(row){
                        data['notificaciones'] = row;
                        console.log(row);
                        res.render('soporte/reporte', data);
                    });
                }
            })
        }
    });
}
exports.atenderSolicitud = function(req, res){
    console.log('POST /solicitud/atender/');
    id_tipo_reparacion = req.body.tipo_reparacion;
    // console.log(id_tipo_reparacion)
    switch (id_tipo_reparacion) {
        case '1': // en sitio
            id_solicitud = req.body.id_solicitud;
            id_equipo = req.body.id_equipo;
            diagnostico_equipo = req.body.diagnostico_equipo;
            image = req.body.firma_img;
            calificacion_servicio = req.body.calificacion;
            firma_conformidad = 'firma_conformidad_'+id_solicitud+'.png';
            
            params_en_sitio = [id_solicitud, id_equipo, id_tipo_reparacion, diagnostico_equipo, firma_conformidad, calificacion_servicio, 'reparado']
            // check fecha_entrega
            db.query('insert into reporte (id_solicitud, id_equipo, id_tipo_reparacion, diagnostico_equipo, firma_conformidad, calificacion_servicio, reparado, fecha_entrega) values(?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP);', params_en_sitio, function(err, result, rows){
                if(err){
                    req.flash('error', 'Error al registrar e reporte.')
                    console.log(err);
                }else{
                    data = image.replace(/^data:image\/\w+;base64,/, '');
                    fs.writeFile('app/signatures/'+firma_conformidad, data, {encoding: 'base64'}, function(err){
                        if(err){
                            req.flash('error', 'Error al guardar la firma');
                            console.log(err);
                        }else{
                            db.query('update notificacion_solicitud set atendida="si" where id_solicitud = ?', [id_solicitud], function(err, result, rows){
                                console.log('err -> '+err);
                                console.log('result -> '+result);
                                console.log('rows ->'+rows);
                                res.redirect('/');
                            }); 
                        }
                    });
                }
            });   
        break;
        case '2': // salida de equipo
            id_solicitud = req.body.id_solicitud;
            id_equipo = req.body.id_equipo;
            image = req.body.firma_salida;
            firma_salida = 'firma_salida_'+id_solicitud+'.png';
            calificacion_servicio = req.body.calificacion;

            params_salida_equipo = [id_solicitud, id_equipo, firma_salida, calificacion_servicio, id_tipo_reparacion, 'no reparado'];
            db.query('insert into reporte (id_solicitud, id_equipo, firma_salida, calificacion_servicio, id_tipo_reparacion, reparado) values(?, ?, ?, ?, ?, ?);', params_salida_equipo, function(err, result, rows){
                if(err){
                    req.flash('error', 'Error al registrar e reporte.')
                    console.log(err);
                }else{
                    data = image.replace(/^data:image\/\w+;base64,/, '');
                    fs.writeFile('app/signatures/'+firma_salida, data, {encoding: 'base64'}, function(err){
                        if(err){
                            req.flash('error', 'Error al guardar la firma');
                            console.log(err);
                        }else{
                            db.query('update notificacion_solicitud set atendida="si" where id_solicitud = ?', [id_solicitud], function(err, result, rows){
                                console.log('err -> '+err);
                                console.log('result -> '+result);
                                console.log('rows ->'+rows);
                                res.redirect('/');
                            }); 
                        }
                    });
                }
            }); 
        break;
        case '3': // dictamen de baja 
            id_solicitud = req.body.id_solicitud;
            id_equipo = req.body.id_equipo;
            diagnostico_equipo = req.body.diagnostico_equipo;
            image = req.body.firma_img;
            calificacion_servicio = req.body.calificacion;
            firma_conformidad = 'firma_conformidad_'+id_solicitud+'.png';
            
            params_en_sitio = [id_solicitud, id_equipo, id_tipo_reparacion, diagnostico_equipo, firma_conformidad, calificacion_servicio, 'no reparado']
            // check fecha_entrega
            db.query('insert into reporte (id_solicitud, id_equipo, id_tipo_reparacion, diagnostico_equipo, firma_conformidad, calificacion_servicio, reparado, fecha_entrega) values(?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP);', params_en_sitio, function(err, result, rows){
                if(err){
                    req.flash('error', 'Error al registrar e reporte.')
                    console.log(err);
                }else{
                    data = image.replace(/^data:image\/\w+;base64,/, '');
                    fs.writeFile('app/signatures/'+firma_conformidad, data, {encoding: 'base64'}, function(err){
                        if(err){
                            req.flash('error', 'Error al guardar la firma');
                            console.log(err);
                        }else{
                            db.query('update notificacion_solicitud set atendida="si" where id_solicitud = ?', [id_solicitud], function(err, result, rows){
                                console.log('err -> '+err);
                                console.log('result -> '+result);
                                console.log('rows ->'+rows);
                                res.redirect('/reportes');
                            }); 
                        }
                    });
                }
            }); 
        break;
    }
}

// GET /solicitud/
exports.solicitud = function(req, res){
			console.log('GET /solicitud/');
            data = {};
            data['error'] = req.flash('error') || false;
            data['success'] = req.flash('success') || false;

            db.query("select auto_increment from information_schema.TABLES WHERE  table_name like 'solicitud';", function(err, rows){
                var id_solicitud = JSON.parse(JSON.stringify(rows))[0].auto_increment;
                data['solicitud'] = id_solicitud;
                data['fecha'] = moment().format("DD / MM / YYYY, h:mm a");
                db.query("select * from cat_tipo_solicitud;", function(err, rows){
                    var tipos_solicitud = JSON.parse(JSON.stringify(rows));
                    data['tipos_solicitud'] = tipos_solicitud;
                    db.query("select *from cat_tipo_servicio", function(err, rows){
                        var tipos_servicio = JSON.parse(JSON.stringify(rows));
                        data['tipos_servicio'] = tipos_servicio;
                        if(req.user.id_rol ==  2){
                            res.render('solicitud/solicitud_recepcionista', data);
                        }
                        else{
                            getNumeroSolicitudes(req.user.id_usuario, function(row){
                                console.log(row);
                                data['notificaciones'] = row;
                                res.render('solicitud/solicitud_soporte', data);
                            })
                        }
                    });
                })
            });  
        }


// POST /solicitud
exports.agregarSolicitud = function(req, res){
			console.log('POST /solicitud/');

            id_usuario_encargado = req.user.id_usuario || null;

            id_tipo_solicitud = req.body.tipo_solicitud || null;
            no_oficio = req.body.no_oficio || null;

            id_empleado_solicitante = req.body.empleado_solicitante || null;

            id_tipo_servicio = req.body.tipo_servicio || null;

            descripcion_problema = req.body.descripcion_problema || null;
            
            solucion = req.body.solucion || null;

            var solicitud = {
                id_usuario_encargado: id_usuario_encargado,
                id_tipo_solicitud: id_tipo_solicitud,
                id_empleado_solicitante: id_empleado_solicitante,
                id_tipo_servicio: id_tipo_servicio,
                descripcion_problema: descripcion_problema
            },
            constraints = {
                id_usuario_encargado: is.required(),
                id_tipo_solicitud: is.required(),
                id_empleado_solicitante: is.required(),
                id_tipo_servicio: is.required(),
                descripcion_problema: [is.required(), is.ofLength({min: 5, max: 500})]
            };

            // validar lo basico de la solicitud 
            solicitudIsValid = validator.validate(solicitud, constraints);
            console.log(solicitudIsValid)
            if(solicitudIsValid == true){
                console.log('isvalid')
                descripcion_solucion = req.body.descripcion_solucion || null;
               
                id_usuario_soporte = req.body.usuario_soporte || null;
                prioridad = req.body.prioridad || null;
                
                if(solucion == "on"){
                    solucion = "si";
                    const data = {descripcion_solucion: descripcion_solucion}, constraint = { descripcion_solucion: [is.required(), is.ofLength({min: 5, max: 500})]}
                    errores_solucion = validator.validate(data, constraint);
                }else{
                    solucion = "no";
                    const data_reporte = {
                        id_usuario_soporte: id_usuario_soporte,
                        prioridad: prioridad
                    }, 
                    constraints = {
                        id_usuario_soporte: is.required(),
                        prioridad: is.required()
                    }
                    errores_solucion = validator.validate(data_reporte, constraints);
                }

                if(errores_solucion == true){
                    // validar la solución
                    fields_solicitud = 'id_solicitud, fecha, descripcion_problema, no_oficio, solucion, id_tipo_servicio,id_tipo_solicitud, id_empleado_solicitante, id_usuario_encargado, descripcion_solucion';
                    data = [descripcion_problema,no_oficio, solucion, id_tipo_servicio, id_tipo_solicitud, id_empleado_solicitante, id_usuario_encargado, descripcion_solucion];
                    db.query("insert into solicitud("+fields_solicitud+") values (default, default, ?, ?, ?, ?, ?, ?, ?, ?);", data, function(err, result, rows){
                        if(err){
                            req.flash('error', 'Error al registrar la solicitud.')
                            console.log(err);
                        }else{
                            if(solucion == "no"){
                                db.query("insert into notificacion_solicitud(id_notificacion, prioridad, id_usuario_soporte, id_solicitud, atendida) values (default, ?, ?, ?, default)", [prioridad, id_usuario_soporte, result.insertId] ,function(err, rows){
                                    if(err){
                                        req.flash('error', 'Error al registrar la notificación solicitud.')
                                        console.log(err);
                                    }else{
                                        req.flash('success', 'Solicitud registrada.')
                                    }

                                });
                            }else{
                                req.flash('success', 'Solicitud registrada.')
                            }
                        }
                        res.redirect('/');
                    });
                }else{
                    res.send(errores_solucion);
                }
            }else{
                res.send(solicitudIsValid);
            }
            
        }

function getNumeroSolicitudes(id_usuario_soporte,callback){
        db.query("select id_usuario_soporte,count(id_notificacion) as numero_solicitudes from notificacion_solicitud where id_usuario_soporte=? and atendida='no' group by id_usuario_soporte;", [id_usuario_soporte], function(err, data){
            if(err)
                callback(err);
            else{
                if (data != ''){
                     callback(JSON.parse(JSON.stringify(data)));
                }else{
                     callback([{'numero_solicitudes': 0}]);
                }
            }
        });
    }

// API solicitud

exports.APIBuscarSolicitud = function(req, res){
    console.log('GET /api/solicitud/buscar/:filtro/:valor')
    console.log('GET /api/solicitud/buscar/'+req.params.filtro+'/'+req.params.valor);
    if(req.params.filtro == "empleado_solicitante"){
        db.query('select * from listar_solicitudes where empleado_solicitante like "%'+req.params.valor+'%" and id_usuario_soporte=? and atendida="no" order by case prioridad when "alta" then 1 when "media" then 2 when "baja" then 3 end, fecha', [req.user.id_usuario], function(err, rows){
            console.log('entraalv');
            if(err){
                res.status(500).json({error: 'Error al realizar la busqueda'});
            }else{
                var solicitudes = JSON.parse(JSON.stringify(rows));
                res.status(200).json(solicitudes);
            }
            //console.log(solicitudes);
        });
    }else{
        db.query("select * from listar_solicitudes where "+req.params.filtro+" =? and id_usuario_soporte=? and atendida='no' order by case prioridad when 'alta' then 1 when 'media' then 2 when 'baja' then 3 end, fecha", [req.params.valor, req.user.id_usuario], function(err, rows){
            if(err){
                res.status(500).json({error: 'Error al realizar la busqueda'});
            }else{
                var solicitudes = JSON.parse(JSON.stringify(rows));
                res.status(200).json(solicitudes);
            }
            //console.log(solicitudes);
        });
    }
    
}

// Atendio solicitud con año y mes
exports.APISolicitudesPorFecha = function (req, res){
    console.log(`APISolicitudesPorFech/${req.params.anio}/${req.params.mes}`)
    db.query(`select count(solicitud.id_solicitud) as solicitudes_atendidas, solicitud.id_usuario_encargado, usuario.nombre from solicitud join usuario on solicitud.id_usuario_encargado=usuario.id_usuario WHERE YEAR(solicitud.fecha) = ? and MONTH(solicitud.fecha) = ? group by solicitud.id_usuario_encargado; `,[req.params.anio, req.params.mes], function(err, rows){
        if(err){
            res.status(500).json({error: 'Error al realizar la busqueda'});
        }else{
            var solicitudes = JSON.parse(JSON.stringify(rows));
            res.status(200).json(solicitudes);
        }
    });
}


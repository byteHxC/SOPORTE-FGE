const db = require('../../config/database');
const moment = require('moment');
var is = require( 'validator.js' ).Assert;
var validator = require( 'validator.js' ).validator();
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
                        res.render('solicitud/solicitud_recepcionista', data);
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
                    db.query("insert into solicitud("+fields_solicitud+") values (default, default, ?, ?, ?, ?, ?, ?, ?, ?);", data, function(err, rows){
                        if(err){
                            req.flash('error', 'Error al registrar la solicitud.')
                            console.log(err);
                        }
                        else{
                            req.flash('success', 'Solicitud registrada.')
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
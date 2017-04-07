const db = require('../../config/database');

// GET /empleado
exports.empleado = function(req, res){
			console.log('GET /empleado');
            // render nuevo empleado
            db.query("select id_rol, nombre from cat_rol where nombre != 'administrador';", function(err, rows){
                var roles = JSON.parse(JSON.stringify(rows));
                res.render('administrador/empleado', {roles: roles, messages: req.flash('info')});
            });
        }

// POST /empleado
exports.agregarEmpleado = function(req, res){
			console.log('POST /empleado');
            nombre = req.body.nombre;
            password = req.body.password;
            id_empleado = req.body.id_empleado;
            rol = req.body.rol;
            db.query('insert into usuario(id_usuario,nombre, password, estado, id_empleado, id_rol) values(default,?,?,"activo",?,?)', [nombre, password, id_empleado, rol], function(err, rows){
                if(err){
                    console.log("erorres => "+err);
                }else{
                    console.log('insert succes')
                    res.redirect('/');
                }
            })
            
        }


// API :- EMPLEADO
exports.APIBuscarPorNombre = function(req, res){
            console.log('GET /api/empleado/buscar/nombre/:nombre/')
            db.query('select *from empleado_info where nombre LIKE "%'+req.params.nombre+'%";', function(err, rows){
                var empleados = JSON.parse(JSON.stringify(rows));
                res.status(200).json(empleados);
            });
        }
exports.APIBuscarPorNumEmpleado = function(req, res){
            console.log('GET /api/empleado/:num_empleado/');
            //console.log("num_empleado => " + req.params.num_empleado)
            db.query('select *from empleado_info where num_empleado=?;',[req.params.num_empleado], function(err, rows){
                var empleado = JSON.parse(JSON.stringify(rows));
                res.status(200).json(empleado[0]);
            });
        }


const db = require('../../config/database');

// GET /nuevo_empleado/
exports.nuevoEmpleado = (req, res) => {
    console.log('GET /nuevo_empleado/');
    res.render('catalogos/nuevo_empleado')
}

// POST /nuevo_empleado/
exports.agregarEmpleado = (req, res) => {
    console.log('POST /nuevo_empleado/');
    
}


// GET /empleado
exports.empleado = function(req, res){
			console.log('GET /empleado');
            // render nuevo empleado
            db.query("select id_rol, nombre from cat_rol where nombre != 'administrador';", function(err, rows){
                var roles = JSON.parse(JSON.stringify(rows));
                res.render('administrador/empleado', {roles: roles, messages: req.flash('info')});
            });
        }


exports.findById = function (req, res){
    console.log('GET /empleado_edit/:id');
    db.query('select * from empleado_info where id_empleado=?;', [req.params.num_empleado], function(err, data){
        //res.status(200).json(data);
        //var info_emp = JSON.parse(JSON.stringify(data));
        res.render('administrador/empleado_edit', {info_emp : data[0]});
    });
}
// POST /empleado



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


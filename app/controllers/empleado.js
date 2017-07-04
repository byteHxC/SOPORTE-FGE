const db = require('../../config/database');

// GET /nuevo_empleado/
exports.nuevoEmpleado = (req, res) => {
    console.log('GET /nuevo_empleado/');
    data = {}
    db.query("select * from cat_puesto", (err, rows) => {
        data['puestos'] = JSON.parse(JSON.stringify(rows));
        db.query("select * from cat_adscripcion", (err, rows) => {
            data['adscripciones'] = JSON.parse(JSON.stringify(rows))
             res.render('catalogos/nuevo_empleado', data)
        });
    });
   
}

// GET /empleado/editar/:id_empleado
exports.verEmpleado = (req, res) => {
    console.log('GET /empleado/editar/:id_empleado');
    data = {}
    db.query("select * from cat_puesto", (err, rows) => {
        data['puestos'] = JSON.parse(JSON.stringify(rows));
        db.query("select * from cat_adscripcion", (err, rows) => {
            data['adscripciones'] = JSON.parse(JSON.stringify(rows))
             db.query("select *from cat_empleado where id_empleado = ?", [req.params.id_empleado], (err, rows) => {
                data['empleado'] = JSON.parse(JSON.stringify(rows[0]))
                res.render('catalogos/editar_empleado', data);
            });
        });
    });

    
}

// PUT /empleado/editar/:id_empleado
exports.editarEmpleado = (req, res) => {
    console.log('PUT /empleado/editar/:id_empleado');
    parms = [req.body.sexo,req.body.telefono, req.body.email, req.body.id_puesto, req.body.id_adscripcion, req.body.id_empleado];
    db.query("update cat_empleado set sexo=?, telefono=?, email=?, id_puesto=?, id_adscripcion=? where id_empleado=?;", parms, (err, result )=>{
        console.log(err);
        console.log(result);
        
        
        res.redirect('/');
    });
}

// POST /nuevo_empleado/
exports.agregarEmpleado = (req, res) => {
    console.log('POST /nuevo_empleado/');
    params = [req.body.telefono, req.body.num_empleado, req.body.cuip, req.body.nombre, req.body.ap_paterno, req.body.ap_materno,req.body.sexo, req.body.email, req.body.puesto, req.body.adscripcion]
	console.log(params);
	db.query("insert into cat_empleado (telefono, num_empleado, cuip, nombre, apellido_paterno, apellido_materno, sexo, email, id_puesto, id_adscripcion, fecha_ingreso) values (?,?,?,?,?,?,?,?,?,?, DATE(now()));", params,function(err, rows){
      if(err){
        	req.flash('error', 'Error al registrar empleado.')
        console.log(err);
       }else{
			req.flash('success', 'Empleado registrado')
       }
     });
	 res.redirect('/');
    
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


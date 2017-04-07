const db = require('../../config/database');

exports.actualizarEstado = function(req, res){
		console.log(' PUT /usuario/');
        id_usuario = req.body.id_usuario;
        estado = req.body.estado;
        nuevo_estado = (estado == 'activo') ? 'inactivo' : 'activo';
        db.query('update usuario set estado = ? where id_usuario = ?', [nuevo_estado, id_usuario], function(err){
            if(err){
                console.log(err);
            }else{
                res.status(200).send('#');
            }
        });
    }

// API :- USUARIO

exports.APIVerUsuarios = function(req, res){
            console.log('GET /api/usuarios/')
            db.query("select usuario.id_usuario, usuario.nombre, usuario.estado, usuario.id_empleado,rol.id_rol, rol.nombre as rol from usuario join cat_rol as rol on usuario.id_rol = rol.id_rol where rol.nombre = 'soporte' and estado='activo';", function(err, rows){
                var usuarios = JSON.parse(JSON.stringify(rows));
                res.status(200).json(usuarios);
            });
        }

exports.APIBuscarPorNombre = function(req, res){
            db.query("select usuario.id_usuario, usuario.nombre, usuario.estado, usuario.id_empleado,rol.id_rol, rol.nombre as rol from usuario join cat_rol as rol on usuario.id_rol = rol.id_rol where rol.nombre != 'administrador' and usuario.nombre=? limit 20;", [req.params.nombre], function(err, rows){
                var usuario = JSON.parse(JSON.stringify(rows));
                res.status(200).json(usuario[0]);
            });
        }
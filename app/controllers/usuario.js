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

//ACTUALIZAR CONTRASEÑA
exports.actualizarPassword = function(req, res){
        console.log(' PUT /usuario/change_password');
        id_usuario = req.user.id_usuario;
        contrasena_old = req.body.password_old;
        contrasena = req.body.password_new;
        db.query('select * from usuario where id_usuario = ? and password = ?;',[id_usuario, contrasena_old], function(err, data){
          if(err){
                console.log(err);
            }else{
                console.log(data);
                if(data == ""){
                    console.log('no coninciden las contra')
                    res.status(505).json({error: 'No coinciden las contraseñas.'})
                }else{
                    console.log('cambio de contra')
                 db.query('update usuario set password = ? where id_usuario = ?', [contrasena, id_usuario], function(err, data){
                    if (err) {
                        res.status(505).json({error: 'Error al procesar cambio de contraseña'})
                    }else{
                          res.redirect('/logout');
                    }
                 });
                }
                
            } 
        });
    }
    
// API :- USUARIO

exports.APIVerUsuarios = function(req, res){
            console.log('GET /api/usuarios/:id_usuario?')
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
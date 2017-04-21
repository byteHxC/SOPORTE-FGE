const db = require('../../config/database');
// GET /
exports.index = function(req, res) {
        console.log('GET /');
        // console.log(req.session);
        db.query("select nombre from cat_rol where id_rol=?",[req.user.id_rol], function(err, rows){
            var rol = JSON.parse(JSON.stringify(rows));
            //console.log(rol);
            if(rol[0].nombre == 'recepcionista'){
                res.redirect('/solicitud/');              
            }else if(rol[0].nombre == 'administrador'){
                // vista principal del usuario administrador
                console.log(req.user);
                db.query("select usuario.id_usuario, usuario.nombre, usuario.estado, usuario.id_empleado,rol.id_rol, rol.nombre as rol from usuario join cat_rol as rol on usuario.id_rol = rol.id_rol where rol.nombre != 'administrador' limit 20;", function(err, rows){
                    var usuarios = JSON.parse(JSON.stringify(rows));
                    // console.log(usuarios)
                    res.render('administrador/index', {usuarios: usuarios});
                });
            }else if(rol[0].nombre == 'soporte'){
                res.redirect('/solicitudes');
            }
        });
    }
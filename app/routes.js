const db = require('../config/database');
const validate = require("validate.js");

module.exports = function(app, passport, express) {
	const router = express.Router();
	// home page
	router.get('/', isLoggedIn,function(req, res) {
        // console.log(req.user);
        db.query("select nombre from cat_rol where id_rol=?",[req.user.id_rol], function(err, rows){
            var rol = JSON.parse(JSON.stringify(rows));
            //console.log(rol);
            if(rol[0].nombre == 'recepcionista'){
                res.send('hola recepcionista, aun no esta tu pagina :c');
            }else if(rol[0].nombre == 'administrador'){
                // vista principal del usuario administrador
                console.log(req.user);
                db.query("select usuario.id_usuario, usuario.nombre, usuario.estado, usuario.id_empleado,rol.id_rol, rol.nombre as rol from usuario join cat_rol as rol on usuario.id_rol = rol.id_rol where rol.nombre != 'administrador' limit 20;", function(err, rows){
                    var usuarios = JSON.parse(JSON.stringify(rows));
                    // console.log(usuarios)
                    res.render('administrador/index', {usuarios: usuarios});
                });
            }else if(rol[0].nombre == 'soporte'){
                res.send('hola soporte, aun no esta tu pagina :c');
            }
        });
    });
    // # END
    // Informacion de empleado
    router.route('/empleado/')
        .get(isLoggedIn,isAdministrador,function(req, res){
            // render nuevo empleado
            db.query("select id_rol, nombre from cat_rol where nombre != 'administrador';", function(err, rows){
                var roles = JSON.parse(JSON.stringify(rows));
                res.render('administrador/empleado', {roles: roles});
            });
        })
        .post(isLoggedIn,isAdministrador, function(req, res){
            nombre = req.body.nombre;
            password = req.body.password;
            id_empleado = req.body.id_empleado;
            rol = req.body.rol;
            var constraints = {
                nombre: {
                    presence: true,
                    length: {
                        minimum: 3,
                        message: "El nombre debe ser mayor que 3 caracteres"
                    }
                },
                password: {
                    presence: true,
                    length: {
                        minimum: 6,
                        message: 'La contraseña debe contener minimo 6 caracteres'
                    }
                },
                id_empleado: {
                    presence: true
                },
                rol: {
                    presence: true
                }
            }
            validate.validators.presence.options = {message: "El campo no puede estar vacio"};
            var errores = validate({nombre: nombre, password: password, id_empleado: id_empleado, rol: rol}, constraints) || null;
            console.log(errores)
            if(errores == null){
                db.query('insert into usuario(id_usuario,nombre, password, estado, id_empleado, id_rol) values(default,?,?,"activo",?,?)', [nombre, password, id_empleado, rol], function(err, rows){
                    if(err){
                        console.log("erorres => "+err);
                    }else{
                        console.log('insert succes')
                        res.redirect('/');
                    }
                })
            }else{
                res.send(errores);
            }
            
        });
    // cambiar de estado    
    router.put('/usuario/', isLoggedIn, isAdministrador, function(req, res){
        
        res.send('si entra =>'+req.body.id_usuario);
    });

    // router.route('/empleado/:id')
    //     .get(isLoggedIn, isAdministrador, function(req, res){
    //         console.log('GET /empleado/:id');
    //         res.render('administrador/empleado_edit');
    //     })

    // inicio de sesion de los usuarios
    router.route('/login')
        .get(function(req, res){
            console.log('GET /login')
            res.render('login', {message: req.flash('loginMessage')});
        })
        .post(passport.authenticate('local-login',{
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }));

    router.get('/logout', function(req, res){
    	req.logout();
    	res.redirect('/login');
    });
    // # END
    

    // set router in app
    app.use(router);

    // API responde json
    const api = express.Router();
    api.route('/empleado/:num_empleado')
        .get(isLoggedIn,isAdministrador, function(req, res){
            console.log("num_empleado => " + req.params.num_empleado)
            db.query('select *from empleado_info where num_empleado=?;',[req.params.num_empleado], function(err, rows){
                var empleado = JSON.parse(JSON.stringify(rows));
                res.status(200).json(empleado[0]);
            });
        });

    app.use('/api', api);

    app.use(function(req, res){
        res.status(400);
        res.render('404');
    });
    
    // # END
    function isAdministrador(req, res, next) {
        console.log(req.user.id_rol);
        // 1 = administrador
        if (req.user.id_rol == 1)
            return next();
        res.render('privileges');
    }
    // Metodos de autentificacion
    function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();
        // if they aren't redirect them to the home page
        res.redirect('/login');
    }
    function notIsLoggedIn(req, res, next) {
        // if user not is authenticated in the session, carry on 
        if (req.isAuthenticated())
            res.redirect('/');
        // if they aren't redirect them to the home page
        return next();
    }

    // # END
}
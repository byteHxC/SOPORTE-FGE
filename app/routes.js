const db = require('../config/database');
const validate = require("validate.js");

// controllers
const empleadoCTRL = require('./controllers/empleado');
const usuarioCTRL = require('./controllers/usuario');
const solicitudCtrl = require('./controllers/solicitud');
const helpersCTRL = require('./controllers/helpers');
const equipoCTRL = require('./controllers/equipo');

module.exports = function(app, passport, express) {
	const router = express.Router();
	// home page
	router.get('/', isLoggedIn, helpersCTRL.index);
    // # END
    // Informacion de empleado
    router.route('/empleado/')
        .get(isLoggedIn,isAdministrador,empleadoCTRL.empleado)
        .post(isLoggedIn,isAdministrador, empleadoCTRL.agregarEmpleado);

    router.get('/empleado_edit/:num_empleado', isLoggedIn, isAdministrador, empleadoCTRL.findById);
        
    // cambiar de estado    
    router.put('/usuario/', isLoggedIn, isAdministrador, usuarioCTRL.actualizarEstado);
    //
    router.put('/usuario/change_password', isLoggedIn, usuarioCTRL.actualizarPassword);
    
    // solicitud
    router.route('/solicitud/')
        .get(isLoggedIn,solicitudCtrl.solicitud)
        .post(isLoggedIn, solicitudCtrl.agregarSolicitud)


    // ver solicitudes en usuario de soporte
    router.get('/solicitudes/', isLoggedIn, solicitudCtrl.solicitudes);

    router.get('/solicitud/atender/:id_solciitud', isLoggedIn, solicitudCtrl.atender);
    router.post('/solicitud/atender/', isLoggedIn, solicitudCtrl.agregarReporte);

    // reportes


    // equipo
    router.route('/equipo')
        .get(isLoggedIn, equipoCTRL.equipo)
        .post(isLoggedIn, equipoCTRL.agregarEquipo);


    // inicio de sesion de los usuarios
    router.route('/login')
        .get(notIsLoggedIn, function(req, res){
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

    // api solicitud
    api.route('/solicitud/buscar/:filtro/:valor')
        .get(isLoggedIn, solicitudCtrl.APIBuscarSolicitud);
    // api empleados
    api.route('/empleado/:num_empleado/')
        .get(isLoggedIn,isAdministrador, empleadoCTRL.APIBuscarPorNumEmpleado);
    
    api.route('/empleado/buscar/nombre/:nombre/')
        .get(isLoggedIn, empleadoCTRL.APIBuscarPorNombre);

    // api /usuarios/
    api.route('/usuarios/')
        .get(isLoggedIn,usuarioCTRL.APIVerUsuarios);

    api.route('/usuario/:nombre/')
        .get(isLoggedIn, isAdministrador, usuarioCTRL.APIBuscarPorNombre);


    // api/equipos
    api.route('/equipo/:filtro/:valor')
        .get(isLoggedIn, equipoCTRL.buscarPor);

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
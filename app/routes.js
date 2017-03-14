const db = require('../config/database');

module.exports = function(app, passport, express) {
	const router = express.Router();

	// home page
	router.get('/', isLoggedIn,function(req, res) {
        // console.log(req.user.id_permiso);
        db.query("select cat_permiso.nombre from cat_permiso where id_permiso=?",[req.user.id_permiso], function(err, rows){
            var permiso = JSON.parse(JSON.stringify(rows));
            console.log(permiso);
            if(permiso[0].nombre == 'recepcionista'){

            }else if(permiso[0].nombre == 'administrador'){
                res.render('administrador/index');
            }else if(permiso[0].nombre == 'soporte'){

            }
        });
    });

    // # END

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

    app.use(function(req, res){
        res.status(400);
        res.render('404');
    });
    
    // # END

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
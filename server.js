// node libraries
const express    = require('express'),
	app          = express(),
	port         = process.env.PORT || 8080,
	passport     = require('passport'),
	flash 	     = require('connect-flash'),
	cookieParser = require('cookie-parser'),
	bodyParser   = require('body-parser'),
	methodOverride = require('method-override'),
	session      = require('express-session');


// Configuraciones iniciales de nodejs
const configDB = require('./config/database.js');

// configuraciones de express
app.use(cookieParser()); // read cookies (needed for auth)

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(methodOverride("_method"));

app.use(express.static('app/assets')); // assets statics
app.use('/signatures', express.static('app/signatures')); // assets statics
app.set('view engine', 'jade'); // set up ejs for templating


// requieridos por passport
app.use(session({ secret: 'ppcdsalvc' })); // session secret
app.use(passport.initialize()); // persistent login sessions
app.use(passport.session());
app.use(function(req,res,next){
    if(req.user){
    	res.locals.user_nombre = req.user.nombre;
    	res.locals.user_id = req.user.id_usuario;
    	//console.log("->"+req.user.id_usuario)
	    if(req.user.id_rol == 1){
	        res.locals.user_rol = "Administrador";
	    }else if(req.user.id_rol == 2){
	        res.locals.user_rol = "Recepcionista";
	    }else if(req.user.id_rol == 3){
	        res.locals.user_rol = "Soporte"
	    }
    }
    next();
});
app.use(flash());  //use connect-flash for flash messages stored in session
require('./config/passport')(passport);

// routes app
require('./app/routes.js')(app, passport, express);	
app.listen(port);
console.log('server running on port : '+port);

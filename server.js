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
app.set('view engine', 'jade'); // set up ejs for templating


// requieridos por passport
app.use(session({ secret: 'ppcdsalvc' })); // session secret
app.use(passport.initialize()); // persistent login sessions
app.use(passport.session());
app.use(flash());  //use connect-flash for flash messages stored in session
require('./config/passport')(passport);

// routes app
require('./app/routes.js')(app, passport, express);	
app.listen(port);
console.log('server running on port : '+port);
const User = require('../app/models/usuario');
const db = require('./database');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){
	passport.serializeUser(function(usuario, done){
		done(null, usuario.id_usuario);
	});
	
	passport.deserializeUser(function(id, done){
		db.query("select id_usuario,nombre, id_rol from usuario where usuario.id_usuario=?",[id], function(err, rows){
			done(err, rows[0]);
		});	
	});	

	passport.use('local-login', new LocalStrategy({
		usernameField: 'usuario',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, usuario, password, done){
		console.log('POST /login')
		db.query("select * from usuario where usuario.nombre=? and usuario.estado='activo'", [usuario], function(err, rows){
			if(err) return done(err);
			if(!rows.length)
				return done(null, false, req.flash('loginMessage', 'Usuario no encontrado o inactivo.'));
			
			if(!(rows[0].password == password))
				return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta.'));
			
			console.log('login success!!!');
			return done(null, rows[0]);
		});
	}));		
}

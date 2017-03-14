const db = require('../../config/database');
// generar password cifrado
const bcrypt = require('bcrypt-nodejs');

module.exports.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
module.exports.validPassword = function(password, passwordCompare){
	return bcrypt.compareSync(password, passwordCompare);
}







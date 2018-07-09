'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
	_id: String,
	nombre: String,
	apellido: String,
	pass: String,
	rol: String,
	imagen: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComentarioSchema = ({
	cuerpo: String,
	anuncio: { type: Schema.ObjectId, ref: 'Anuncio' },
	autor: { type: String, ref: 'Usuario' }
});

module.exports = mongoose.model('Comentario', ComentarioSchema);
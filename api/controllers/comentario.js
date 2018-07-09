'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Usuario = require('../models/usuario');
var Album = require('../models/anuncio');
var Comentario = require('../models/comentario');

function getComentario(req, res){
	var comentarioId = req.params.id;

	Comentario.findById(comentarioId).populate({path: 'anuncio'}).exec((err, comentario) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!comentario){
				res.status(404).send({message: 'La comentario no existe !!'});
			}else{
				res.status(200).send({comentario});
			}
		}
	});
}

function getComentarios(req, res){
	var anuncioId = req.params.id;
	console.log('Id del anuncio del cual vamos a recoger los comentarios: '+anuncioId);
	if(!anuncioId){
		var find = Comentario.find({}).sort('_id'); //OJO A ESTO
	}else{
		var find = Comentario.find({anuncio: anuncioId}).sort('cuerpo'); // OJO A ESTO
	}

	find.populate({
		path: 'anuncio',
		populate: {
			path: 'usuario',
			model: 'Usuario'
		}
	}).exec(function(err, comentarios){
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!comentarios){
				res.status(404).send({message: 'No hay comentarios !!'});
			}else{
				res.status(200).send({comentarios});
			}
		}
	});
}

function saveComentario(req, res){
	var comentario = new Comentario();
	var params = req.body;
	comentario.cuerpo = params.cuerpo;
	comentario.autor = params.autor;
	comentario.anuncio = params.anuncio;

	comentario.save((err, comentarioStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!comentarioStored){
				res.status(404).send({message: 'No se ha guardado el comentario'});
			}else{
				res.status(200).send({comentario: comentarioStored});
			}
		}
	});
}

function deleteComentario(req, res){
	var comentarioId = req.params.id;
	
	Comentario.findByIdAndRemove(comentarioId, (err, comentarioRemoved) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!comentarioRemoved){
				res.status(404).send({message: 'No se ha borrado el comentario'});
			}else{
				res.status(200).send({comentario: comentarioRemoved});
			}
		}
	});
}

module.exports = {
	getComentario,
	getComentarios,
	saveComentario,
	deleteComentario,
};
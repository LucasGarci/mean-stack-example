'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Anuncio = require('../models/anuncio');
var Usuario = require('../models/usuario');
var Comentario = require('../models/comentario');

function getAnuncio(req, res) {
	var anuncioId = req.params.id;

	Anuncio.findById(anuncioId).populate({ path: 'autor' }).exec((err, anuncio) => {
		if (err) {
			res.status(500).send({ message: 'Error en la petición' });
		} else {
			if (!anuncio) {
				res.status(404).send({ message: 'El anuncio no existe.' });
			} else {
				res.status(200).send({ anuncio });
			}
		}
	});
}

function getAnuncios(req, res) {
	var usuarioId = req.params.usuario;

	if (!usuarioId) {
		// Sacar todos los anuncios de la bbdd
		var find = Anuncio.find({}).sort('titulo');
	} else {
		// Sacar los anuncios de un usuario concreto de la bbdd
		var find = Anuncio.find({ usuario: usuarioId }).sort('precio');
	}

	find.populate({ path: 'usuario' }).exec((err, anuncios) => {
		if (err) {
			res.status(500).send({ message: 'Error en la petición' });
		} else {
			if (!anuncios) {
				res.status(404).send({ message: 'No hay anuncios' });
			} else {
				res.status(200).send({ anuncios });
			}
		}
	});
}

function saveAnuncio(req, res) {
	var anuncio = new Anuncio();
	var params = req.body;

	anuncio.titulo = params.titulo;
	anuncio.cuerpo = params.cuerpo;
	anuncio.precio = params.precio;
	anuncio.categoria = params.categoria;
	anuncio.imagen = 'null';
	anuncio.autor = params.autor;

	anuncio.save((err, anuncioStored) => {
		if (err) {
			res.status(500).send({ message: 'Error en el servidor' });
		} else {
			if (!anuncioStored) {
				res.status(404).send({ message: 'No se ha guardado el anuncio' });
			} else {
				res.status(200).send({ anuncio: anuncioStored });
			}
		}
	});
}

function updateAnuncio(req, res) {
	var anuncioId = req.params.id;
	var update = req.body;

	Anuncio.findByIdAndUpdate(anuncioId, update, (err, anuncioUpdated) => {
		if (err) {
			res.status(500).send({ message: 'Error en el servidor' });
		} else {
			if (!anuncioUpdated) {
				res.status(404).send({ message: 'No se ha actualizado el anuncio' });
			} else {
				res.status(200).send({ anuncio: anuncioUpdated });
			}
		}
	});
}

function deleteAnuncio(req, res) {
	console.log("Call deleteAnuncio")
	console.log("Anuncio to delete: " + req.params.id)
	var anuncioId = req.params.id;

	Anuncio.findById(anuncioId).remove((err, anuncioRemoved) => {
		if (err) {
			res.status(500).send({ message: 'Error al eliminar el anuncio' });
		} else {
			if (!anuncioRemoved) {
				console.log('Anuncio para borrar ...');
				console.log(anuncioRemoved);
				res.status(404).send({ message: 'El anuncio no ha sido eliminado' });
			} else {

				Comentario.find({ anuncio: anuncioRemoved._id }).remove((err, comentarioRemoved) => {
					if (err) {
						res.status(500).send({ message: 'Error al eliminar el comentario' });
					} else {
						if (!comentarioRemoved) {
							res.status(404).send({ message: 'El comentario no ha sido eliminada' });
						} else {
							res.status(200).send({ anuncio: anuncioRemoved });
						}
					}
				});
			}
		}
	});
}

function uploadImage(req, res) {
	var anuncioId = req.params.id;
	console.log(anuncioId);
	var file_name = 'No subido...';

	if (req.files) {
		console.log(req.files);
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[1];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
			Anuncio.findByIdAndUpdate(anuncioId, { imagen: file_name }, (err, anuncioUpdated) => {
				if (!anuncioUpdated) {
					res.status(404).send({ message: 'No se ha podido actualizar el anuncio' });
				} else {
					res.status(200).send({ anuncio: anuncioUpdated });
				}
			});

		} else {
			res.status(200).send({ message: 'Extensión del archivo no valida' });
		}

	} else {
		res.status(200).send({ message: 'No has subido ninguna imagen...' });
	}
}

function getImageFile(req, res) {
	var imagenFile = req.params.imageFile;
	console.log(req.params)
	var path_file = './uploads/' + imagenFile;
	console.log(path_file)
	fs.exists(path_file, function (exists) {
		if (exists) {
			res.sendFile(path.resolve(path_file));
		} else {
			res.status(200).send({ message: 'No existe la imagen...' });
		}
	});
}


module.exports = {
	getAnuncio,
	saveAnuncio,
	getAnuncios,
	updateAnuncio,
	deleteAnuncio,
	uploadImage,
	getImageFile
};
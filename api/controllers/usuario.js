'use strict'

var fs = require('fs');
var path = require('path');
var Usuario = require('../models/usuario');
var md = require('../midleware/authenticated');



function pruebas(req, res) {
	res.status(200).send({
		message: 'Probando una acción del controlador de usuarios del api rest con Node y Mongo'
	});
}

function saveUsuario(req, res) {
	console.log('call saveUsuario...');
	var usuario = new Usuario();
	var params = req.body;

	console.log(params);

	usuario._id = params.mail;
	usuario.nombre = params.nombre;
	usuario.apellido = params.apellido;
	usuario.rol = 'user';
	usuario.imagen = params.imagen;
	usuario.pass = params.pass;


	if (!usuario.pass) {
		res.status(200).send({ message: 'Introduce la contraseña' });
	} else {
		if (usuario.nombre != null && usuario.apellido != null && usuario._id != null) {
			// Guardar el usuario
			usuario.save((err, usuarioStored) => {
				if (err) {
					res.status(500).send({ message: 'Error al guardar el usuario' });
				} else {
					if (!usuarioStored) {
						res.status(404).send({ message: 'No se ha registrado el usuario' });
					} else {
						res.status(200).send({ usuario: usuarioStored });
					}
				}
			});
		} else {
			res.status(200).send({ message: 'Rellena todos los campos' });
		}
	}
}

function getPerfil(req, res) {
	console.log('getPerfil llamado...')
	//console.log(req);
	var params = req.body;
	//console.log(params)
	var _id = params._id;
	console.log(_id);

	Usuario.findOne({ _id: _id.toLowerCase() }, (err, usuario) => {
		//console.log("Usuario es:" + usuario);
		if (err) {
			res.status(500).send({ message: 'Error en la petición' });
		} else {
			if (!usuario) {
				res.status(404).send({ message: 'El usuario no existe' });
			} else {
				res.status(200).send({ usuario });
			}
		}
	});
}

function loginUsuario(req, res) {

	var params = req.body;
	console.log(params)
	var _id = params.mail;
	console.log(_id);
	var pass = params.pass;
	console.log(pass);
	Usuario.findOne({ _id: _id.toLowerCase() }, (err, usuario) => {
		console.log("Usuario es:" + usuario);
		if (err) {
			res.status(500).send({ message: 'Error en la petición' });
		} else {
			if (!usuario) {
				res.status(404).send({ message: 'El usuario no existe' });
			} else {
				console.log("Pasword es: " + pass);

				//devolver los datos del usuario logueado 
				res.status(200).send({ usuario });
			}
		}
	});
}

function updateUsuario(req, res) {
	console.log('Llamando al update de usuario..');
	var usuarioId = req.body._id;
	console.log(req.body._id);
	var update = req.body;
	console.log(req.body);

	Usuario.findByIdAndUpdate(usuarioId, update, (err, usuarioUpdated) => {
		if (err) {
			res.status(500).send({ message: 'Error al actualizar el usuario' });
		} else {
			if (!usuarioUpdated) {
				res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
			} else {
				res.status(200).send({ usuario: usuarioUpdated });
			}
		}
	});
}

function uploadImage(req, res) {
	var usuarioId = req.params.id;
	console.log(usuarioId);
	var file_name = 'No subido...';

	if (req.files) {
		console.log(req.files);
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[1];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
			Usuario.findByIdAndUpdate(usuarioId, { imagen: file_name }, (err, usuarioUpdated) => {
				if (!usuarioUpdated) {
					res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
				} else {
					res.status(200).send({ usuario: usuarioUpdated });
				}
			});

		} else {
			res.status(200).send({ message: 'Extensión del archivo no valida' });
		}

	} else {
		res.status(200).send({ message: 'No has subido ninguna imagen...' });
	}
}

module.exports = {
	pruebas,
	saveUsuario,
	loginUsuario,
	updateUsuario,
	getPerfil,
	uploadImage
};

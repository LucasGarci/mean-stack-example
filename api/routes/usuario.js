'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');
var api = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads' });

api.post('/login', UsuarioController.loginUsuario);
api.post('/perfil', UsuarioController.getPerfil);
api.post('/register', UsuarioController.saveUsuario);
api.put('/update-usuario', UsuarioController.updateUsuario);
api.post('/upload-image-usuario/:id', [md_upload], UsuarioController.uploadImage);

module.exports = api;
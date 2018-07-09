'use strict'

var express = require('express');
var ComentarioController = require('../controllers/comentario');
var api = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads' });

api.get('/comentario/:id', ComentarioController.getComentario);
api.post('/comentario', ComentarioController.saveComentario);
api.get('/comentariosde/:id', ComentarioController.getComentarios);
api.delete('/comentario/:id', ComentarioController.deleteComentario);

module.exports = api;
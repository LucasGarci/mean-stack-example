'use strict'

var express = require('express');
var AnuncioController = require('../controllers/anuncio');
var api = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads' });

api.get('/anuncio/:id', AnuncioController.getAnuncio);
api.post('/anuncio', AnuncioController.saveAnuncio);
api.get('/anuncios/:artist?', AnuncioController.getAnuncios);
api.put('/anuncio/:id', AnuncioController.updateAnuncio);
api.delete('/anuncio/:id', AnuncioController.deleteAnuncio);
api.post('/upload-image-anuncio/:id', [md_upload], AnuncioController.uploadImage);
api.get('/get-image-anuncio/:imageFile', AnuncioController.getImageFile);

module.exports = api;
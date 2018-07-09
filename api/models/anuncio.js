'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var AnuncioSchema=({
	titulo: String,
	cuerpo: String,
	precio: Number,
	categoria: String,
	imagen: String,
	autor: {type:String ,ref:'Usuario'}
});

module.exports=mongoose.model('Anuncio', AnuncioSchema);
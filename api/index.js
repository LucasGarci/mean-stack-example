'use strict'

var mongoose=require('mongoose');
var app=require('./app');
var port=process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/means', (err,res)=>{
  if (err){
    throw err;
  }else{
    console.log("La conexion a la base de datos es correcta");

    app.listen(port,function(){
      console.log("Servidor escuchando en http://localhost:"+port);
    });
  }
});

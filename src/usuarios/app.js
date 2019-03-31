const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser')
require('./helpers');
const directoriopublico = path.join(__dirname,'../../public' );
const directoriopartials = path.join(__dirname,'../../templates/partials' );
app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','hbs');
app.get('/',(req,res) =>{
	res.render('index',{
		estudiante:'sebastian'});
});
path.join(__dirname,'../../public' );

app.get('/verUsuarios',(req,res)=>{
	console.log(req.body);
	res.render('verUsuarios',{
		documentoDeIdentidad: req.query.id,
		nombre: req.query.nombre,
		correo: req.query.correo,
		telefono:req.query.telefono
	});
});

app.get('/crearUsuario',(req,res)=>{
	res.render('crearUsuario',{
		documentoDeIdentidad: req.query.id,
		nombre: req.query.nombre,
		correo: req.query.correo,
		telefono:req.query.telefono
	});
});

app.get('/Vercursos',(req,res)=>{
	res.render('verCursos')
})

app.get('/inscribir',(req,res)=>{
	res.render('inscribir')
})

app.get('/verInscritos',(req,res)=>{
	res.render('verInscritos')
})

app.get('*',(req,res)=>{
	res.render('error',{
		estudiante :'error'
	})
})
//app.use(express.static(__dirname + '/public'))
console.log(__dirname);
app.listen(5000,()=>{
	console.log('escucha por el puerto');
});
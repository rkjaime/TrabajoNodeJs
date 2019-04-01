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

app.post('/verUsuarios',(req,res)=>{
	res.render('verUsuarios',{
		documentoDeIdentidad: req.body.id,
		nombre: req.body.nombre,
		correo: req.body.correo,
		telefono:req.body.telefono
	});
});

app.get('/crearUsuario',(req,res)=>{
	res.render('crearUsuario')
});

app.get('/crearCurso',(req,res)=>{
	res.render('crearCurso')
});

app.post('/VerCursos',(req,res)=>{
	res.render('verCursos',{
		nombre : req.body.nombre,
		idCurso: req.body.idCurso,
		descripcion: req.body.descripcion,
		valor: req.body.valor,
		modalidad: req.body.modalidad,
		intensidadHoraria: req.body.intensidadHoraria
	});

});

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
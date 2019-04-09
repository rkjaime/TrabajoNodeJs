const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Estudiante = require('../models/estudiantes');
const Aspirante = require('../models/CursosUsuarios');
const Cursos = require('../models/cursos');
const session = require('express-session');
require('./helpers');
const directoriopublico = path.join(__dirname,'../../public' );
const directoriopartials = path.join(__dirname,'../../templates/partials' );
app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','hbs');
app.use(session({
	secret: 'keyboard cat',
	resave : false,
	saveUninitialized: true
}));

path.join(__dirname,'../../public' );

app.get('',(req,res) =>{
	res.render('index');
});

app.get('/login', function(req, res){
   res.render('login');
});

app.post('/login', function(req, res){

	Estudiante.findOne({documentoDeIdentidad : req.body.documentoDeIdentidad},(err,resultados) =>{
		if(err){
			return console.log(err)
		}
		if(!resultados){
			return res.render('login',{
				mensaje : "usuario no encontrado"
			})
		}
		if(resultados.rol == 'coordinador'){
			return res.render('paginaInicialCoordinador',{
				mensaje : "coordinador no encontrado"
			})
		}				
		req.session.documentoDeIdentidad = resultados._id
		res.render('paginaInicialUsuario',{
			mensaje: "bienvenido" + resultados.documentoDeIdentidad + req.session.usuario
		})
	})
})
app.post('/verUsuarios',(req,res)=>{

	let estudiante = new Estudiante({
		documentoDeIdentidad: req.body.id,
		nombre: req.body.nombre,
		correo: req.body.correo,
		telefono:req.body.telefono	
	})
	estudiante.save((err,resultado) =>{
		if(err){
			res.render('verUsuarios',{
				mostrar : err
			});
		}
		if(err){
			res.render('verUsuarios',{
				mostrar : resultado
			});
		}		
	})
	res.render('crearUsuario');
});

app.get('/crearUsuario',(req,res)=>{
	res.render('crearUsuario')
});

app.get('/verUsuarios',(req,res)=>{
	Estudiante.find({}).exec((err,respuesta)=>{
		if(err){
			return console.log(err)
		}
		res.render('verUsuarios',{
			listado:respuesta
		})
	})
});

app.get('/crearCurso',(req,res)=>{
	res.render('crearCurso')
});

app.get('/verCursos',(req,res)=>{
Cursos.find({}).exec((err,respuesta)=>{
		if(err){
			return console.log(err)
		}
		res.render('verCursos',{
			listado:respuesta
		})
	})
});

app.get('/verCursosAbiertos',(req,res)=>{
Cursos.find({}).exec((err,respuesta)=>{
		if(err){
			return console.log(err)
		}
		res.render('verCursosAbiertos',{
			listado:respuesta
		})
	})
});

app.post('/VerCursos',(req,res)=>{
	let curso = new Cursos({
		nombre : req.body.nombre,
		idCurso: req.body.idCurso,
		descripcion: req.body.descripcion,
		valor: req.body.valor,
		modalidad: req.body.modalidad,
		intensidadHoraria: req.body.intensidadHoraria	
	})
	curso.save((err,resultado) =>{
		if(err){
			res.render('VerCursos',{
				mostrar : err
			});
		}
		if(err){
			res.render('VerCursos',{
				mostrar : resultado
			});
		}		
	})
	res.render('VerCursos');
});


app.post('/VerCursosAbiertos',(req,res)=>{
	let curso = new Cursos({
		nombre : req.body.nombre,
		idCurso: req.body.idCurso,
		descripcion: req.body.descripcion,
		valor: req.body.valor,
		modalidad: req.body.modalidad,
		intensidadHoraria: req.body.intensidadHoraria	
	})
	curso.save((err,resultado) =>{
		if(err){
			res.render('VerCursosAbiertos',{
				mostrar : err
			});
		}
		if(err){
			res.render('VerCursosAbiertos',{
				mostrar : resultado
			});
		}		
	})
	res.render('VerCursosAbiertos');
});
app.get('/inscribir',(req,res)=>{
	res.render('inscribir')
})

app.post('/inscribir',(req,res)=>{

	let aspirante = new Aspirante({
		documentoDeIdentidad: req.body.id,
		nombre: req.body.nombre,
		correo: req.body.correo,
		telefono:req.body.telefono	
	})
	aspirante.save((err,resultado) =>{
		if(err){
			res.render('verInscritos',{
				mostrar : err
			});
		}
		if(err){
			res.render('verInscritos',{
				mostrar : resultado
			});
		}		
	})
	res.render('verInscritos');
});


app.post('/verInscritos',(req,res)=>{

	let aspirante = new Aspirante({
		documentoDeIdentidad: req.body.id,
		nombre: req.body.nombre,
		correo: req.body.correo,
		telefono:req.body.telefono	
	})
	aspirante.save((err,resultado) =>{
		if(err){
			res.render('verInscritos',{
				mostrar : err
			});
		}
		if(err){
			res.render('verInscritos',{
				mostrar : resultado
			});
		}		
	})
	res.render('inscribir');
});

app.get('/verInscritos',(req,res)=>{
Aspirante.find({}).exec((err,respuesta)=>{
		if(err){
			return console.log(err)
		}
		res.render('verInscritos',{
			listado:respuesta
		})
	})
});



app.get('*',(req,res)=>{
	res.render('error',{
		estudiante :'error'
	});
});

app.get('/',(req,res)=>{
Cursos.find({}).exec((err,respuesta)=>{
		if(err){
			return console.log(err)
		}
		res.render('verCursosAbiertos',{
			listado:respuesta
		})
	})
});

app.post('/eliminarInscrito',(req,res)=>{
	Aspirante.findOneAndDelete({documentoDeIdentidad:req.body.documentoDeIdentidad},req.body,(err,resultado)=>{
		if(err){
			return console.log(err)
		}

		res.render('eliminarInscrito',{
			documentoDeIdentidad:resultado.documentoDeIdentidad
		})
	})
})
mongoose.connect('mongodb://localhost:27017/asignaturas',{useNewUrlParser :true},(err,resultado) =>
	{
		if(err){
			return console.log(error);
		}
		console.log("conectado");
	});

//app.use(express.static(__dirname + '/public'))
console.log(__dirname);
app.listen(5000,()=>{
	console.log('escucha por el puerto');
});
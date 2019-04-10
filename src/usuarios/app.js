const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Estudiante = require('../models/estudiantes');
const Aspirante = require('../models/CursosUsuarios');
const Cursos = require('../models/cursos');
const port = process.env.PORT || 3000;
const session = require('express-session');
require('./helpers');
const directoriopublico = path.join(__dirname,'../../public' );
const directoriopartials = path.join(__dirname,'../../templates/partials' );
const dirNode_modules = path.join(__dirname , '../../node_modules/');
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));
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
	res.render('login');
});

app.get('/login', function(req, res){
   res.render('login');
});

app.post('/login', (req, res) => {
    Estudiante.findOne({documentoDeIdentidad: req.body.documentoDeIdentidad},(err,resultados) =>{
        if(!resultados){
            return res.render('login',{
                tipoMensaje: 'alert alert-danger',
                mensaje: 'Usuario no existe'
            })
        }
        if(resultados.rol == 'coordinador'){
            return res.render('paginaInicialCoordinador',{
                tipoMensaje: 'alert alert-success',
                mensaje: 'bienvenido'
            })
        }                
        res.render('paginaInicialUsuario',{
                tipoMensaje: 'alert alert-success',
                mensaje: 'bienvenido ' + resultados.nombre
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
		if(!resultado){
			res.render('crearUsuario',{
                tipoMensaje: 'alert alert-danger',
                mensaje: 'Ha ocurrido un problema'
			});
		}
        res.render('crearUsuario',{
                tipoMensaje: 'alert alert-success',
                mensaje: 'se ha ingresado correctamente' + resultado.nombre
        })
        })
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

app.get('/actualizar',(req,res)=>{
	res.render('actualizar')
});

app.post('/actualizar',(req,res)=>{
	Cursos.findOneAndUpdate({idCurso:req.body.idCurso},req.body,{new : true},(err,resultado)=>{
		if(err){
			return console.log(err)
		}
		res.render('actualizar',{
		nombre : resultado.nombre,
		idCurso: resultado.idCurso,
		descripcion: resultado.descripcion,
		valor: resultado.valor,
		modalidad: resultado.modalidad,
		intensidadHoraria: resultado.intensidadHoraria,
		estado: resultado.estado
		})
	})
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
	res.render('crearCurso');
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
		if(!resultado){
			res.render('inscribir',{
                tipoMensaje: 'alert alert-danger',
                mensaje: 'Ha ocurrido un problema'
			});
		}
        res.render('inscribir',{
                tipoMensaje: 'alert alert-success',
                mensaje: 'se ha ingresado correctamente'
        })
        })
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

console.log(__dirname);
app.listen(port,()=>{
	console.log('escucha por el puerto' + port);
});
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const listaUsuarios = require('./usuarios.json');
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

app.get('/login', function(req, res){
   res.render('login');
});

app.post('/login', function(req, res){

   if(!req.body.id){
      res.render('login', {message: "Please enter id"});
   } else {
      listaUsuarios.filter(function(user){
      	console.log(user.documentoDeIdentidad);
      	console.log(user.rol);
         if(user.documentoDeIdentidad === req.body.id  && user.rol === 'aspirante'){
            res.redirect('/verCursos');
         }
         else if(user.documentoDeIdentidad === req.body.id  && user.rol === 'coordinador'){
         	res.redirect('/verCursosAbiertos');
         }
      });
      res.render('login', {message: "Invalid credentials!"});
   }
});

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

app.get('/verCursos',(req,res)=>{
	res.render('verCursos')
});

app.get('/verCursosAbiertos',(req,res)=>{
	res.render('verCursosAbiertos')
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

app.post('/VerCursosAbiertos',(req,res)=>{
	res.render('verCursosAbiertos',{
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
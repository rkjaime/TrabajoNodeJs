const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Estudiante = require('../models/estudiantes');
const Aspirante = require('../models/CursosUsuarios');
const Cursos = require('../models/cursos');
const multer  = require('multer');
const port = process.env.PORT || 3000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { Usuarios } = require('./usuarios');
const usuarios = new Usuarios();
process.env.URLDB ='mongodb://localhost:27017/asignaturas';
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

io.on('connection', client => {
    console.log(client)

    console.log("un usuario se ha conectado")

    // client.emit("mensaje", "Bienvenido a mi página")

    // client.on("mensaje", (informacion) =>{
    // console.log(informacion)
    // })

    // client.on("contador", () =>{
    //     contador ++
    //     console.log(contador)
    //     io.emit("contador", contador )
    // })

    client.on('usuarioNuevo', (usuario) =>{
        let listado = usuarios.agregarUsuario(client.id, usuario)
        console.log(listado)
        let texto = `Se ha conectado ${usuario}`
        io.emit('nuevoUsuario', texto )
    })

    client.on('disconnect',()=>{
        let usuarioBorrado = usuarios.borrarUsuario(client.id)
        let texto = `Se ha desconectado ${usuarioBorrado.nombre}`
        io.emit('usuarioDesconectado', texto)
            })

    client.on("texto", (text, callback) =>{
        let usuario = usuarios.getUsuario(client.id)
        let texto = `${usuario.nombre} : ${text}`
        
        io.emit("texto", (texto))
        callback()
    })

    client.on("textoPrivado", (text, callback) =>{
        let usuario = usuarios.getUsuario(client.id)
        let texto = `${usuario.nombre} : ${text.mensajePrivado}`
        let destinatario = usuarios.getDestinatario(text.destinatario)
        client.broadcast.to(destinatario.id).emit("textoPrivado", (texto))
        callback()
    })

    
});
app.get('',(req,res) =>{
	res.render('login');
});

app.get('/login', function(req, res){
   res.render('login');
});

app.get('/logout', (req, res) => {
    res.render('login', {
            tipoMensaje: 'alert alert-success',
            mensaje: 'se ha salido correctamente'
    });
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
                mensaje: 'bienvenido ' + resultados.nombre + ' a la pagina principal del coordinador'
            })
        }                
        res.render('paginaInicialUsuario',{
                tipoMensaje: 'alert alert-success',
                mensaje: 'bienvenido ' + resultados.nombre + ' a la pagina principal del usuario'
        })
    })
})

app.post('/crearUsuario', (req, res) => {
    Estudiante.findOne({ documentoDeIdentidad: req.body.documentoDeIdentidad }, (err, resu) => {
        if (err) {
           return console.log(err)
        }
        if (resu != null) {
            return res.render('crearUsuario', {
            	tipoMensaje: 'alert alert-danger',
                mensaje: "Usuario ya registrado."
            });
        }
        let estudiante = new Estudiante({
		documentoDeIdentidad: req.body.id,
		nombre: req.body.nombre,
		correo: req.body.correo,
		telefono:req.body.telefono	
        });
        estudiante.save((err, resultado) => {
            if (err) {
                return res.render('crearUsuario', {
                	tipoMensaje: 'alert alert-danger',
               		mensaje: 'El usuario ya esta registrado'
                });
            }
            if (!resultado) {
                return res.render('crearUsuario', {
                	tipoMensaje: 'alert alert-danger',
               		mensaje: 'El usuario ya esta registrado'
                });
            }
        res.render('paginaInicialUsuario',{
                tipoMensaje: 'alert alert-success',
                mensaje: 'se ha creado el usuario ' + resultado.nombre + 'has sido redirigido a la pagina principal'
        })
        });
    });
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

app.post('/crearCurso', (req, res) => {
    Cursos.findOne({ idCurso: req.body.idCurso }, (err, resu) => {
        if (err) {
           return console.log(err)
        }
        if (resu != null) {
            return res.render('crearUsuario', {
            	tipoMensaje: 'alert alert-danger',
                mensaje: "Curso ya creado."
            });
        }
	let curso = new Cursos({
		nombre : req.body.nombre,
		idCurso: req.body.idCurso,
		descripcion: req.body.descripcion,
		valor: req.body.valor,
		modalidad: req.body.modalidad,
		intensidadHoraria: req.body.intensidadHoraria	
	});
        curso.save((err, resultado) => {
            if (err) {
                return res.render('crearCurso', {
                	tipoMensaje: 'alert alert-danger',
               		mensaje: 'El curso ya esta registrado'
                });
            }
            if (!resultado) {
                return res.render('crearCurso', {
                	tipoMensaje: 'alert alert-danger',
               		mensaje: 'El curso ya esta registrado'
                });
            }
        res.render('crearCurso',{
                tipoMensaje: 'alert alert-success',
                mensaje: 'el curso' + resultado.nombre + 'se ha creado con exito'
        })
        });
    });
});

app.get('/actualizar',(req,res)=>{
	res.render('actualizar')
});

app.post('/actualizar', (req, res) => {
    Cursos.findOne({ idCurso: req.body.idCurso }, (err, resu) => {
        if (err) {
           return console.log(err)
        }
        if (!resu) {
            return res.render('actualizar', {
            	tipoMensaje: 'alert alert-danger',
                mensaje: 'No hay cursos con ese id para cambiar'
            });
        }
	Cursos.findOneAndUpdate({idCurso:req.body.idCurso},req.body,{new : true},(err,resultado)=>{
		if(err){
			return console.log(err)
		}
        if (!resultado) {
            return res.render('actualizar', {
               	tipoMensaje: 'alert alert-danger',
               	mensaje: 'Hay un problema,intentelo de nuevo'
             });
        }
		res.render('actualizar',{
		nombre : resultado.nombre,
		idCurso: resultado.idCurso,
		descripcion: resultado.descripcion,
		valor: resultado.valor,
		modalidad: resultado.modalidad,
		intensidadHoraria: resultado.intensidadHoraria,
		estado: resultado.estado,
		tipoMensaje: 'alert alert-success',
        mensaje: 'el curso ' + resultado.nombre + ' se ha actualizado con exito'
		})
	})
});
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

app.get('/verCursosCoordinadorAbierto',(req,res)=>{
Cursos.find({}).exec((err,respuesta)=>{
        if(err){
            return console.log(err)
        }
        res.render('verCursosCoordinadorAbierto',{
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

app.post('/mostrarInscrito',(req,res)=>{
    console.log(req.body.nombre )
    Aspirante.findOne({ telefono: req.body.nombre }, (err, resu) => {
        if (err) {
           return console.log(err)
        }
        if (!resu) {
            return res.render('paginaInicialCoordinador', {
                tipoMensaje: 'alert alert-danger',
                mensaje: 'No existen usuarios inscritos en el curso, se ha redirigido a la pagina principal'
            });
        }
Aspirante.find({telefono: req.body.nombre}).exec((err,respuesta)=>{
    console.log(respuesta)
        if(err){
            return console.log(err)
        }
        return res.render('mostrarInscrito',{
                tipoMensaje: 'alert alert-success',
                mensaje: 'listado realizado',
                listado: respuesta
        })
    })
});
});


app.get('/inscribir',(req,res)=>{
    Cursos.find({}).exec((err,respuesta)=>{
        if(err){
            return console.log(err)
        }
        res.render('inscribir',{
            listado:respuesta
        })
    })
});

/*var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})*/
 
var upload = multer({ })

app.post('/inscribir',upload.single('datos') , (req, res) => {
    console.log(req.file.buffer);
    Aspirante.findOne({ documentoDeIdentidad: req.body.id,telefono:req.body.telefono}, (err, resu) => {
        if (err) {
           return console.log(err)
        }
        if (resu != null) {
            return res.render('inscribir', {
            	tipoMensaje: 'alert alert-danger',
                mensaje: "ya existe un usuario registrado a ese curso."
            });
        }
        let aspirante = new Aspirante({
		documentoDeIdentidad: req.body.id,
		nombre: req.body.nombre,
		correo: req.body.correo,
		telefono:req.body.telefono,
        datos: req.file.buffer
        });
        aspirante.save((err, resultado) => {
            if (err) {
                return res.render('inscribir', {
                	tipoMensaje: 'alert alert-danger',
               		mensaje: 'ya existe un usuario registrado a ese curso'
                });
            }
            if (!resultado) {
                return res.render('inscribir', {
                	tipoMensaje: 'alert alert-danger',
               		mensaje: 'ya existe un usuario registrado a ese curso'
                });
            }
        res.render('inscribir',{
                tipoMensaje: 'alert alert-success',
                mensaje: 'el usuario ' + resultado.nombre + 'se ha registrado al curso ' + resultado.telefono,
        })
        });
    });
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

app.post('/eliminarInscrito',(req,res)=>{
	Aspirante.findOneAndDelete({documentoDeIdentidad:req.body.documentoDeIdentidad},req.body,(err,resultado)=>{
		if(err){
			return console.log(err)
		}
		res.render('eliminarInscrito',{
			documentoDeIdentidad:resultado.documentoDeIdentidad,
			telefono:resultado.telefono,
			tipoMensaje: 'alert alert-success',
            mensaje: 'el usuario ' + resultado.nombre + 'ha sido eliminado del curso ' + resultado.telefono
		})
	})
})

mongoose.connect(process.env.URLDB,{useNewUrlParser :true},(err,resultado) =>
   {
       if(err){
           return console.log(err);
           console.log(hecho);
       }
       console.log("conectado");
   });

console.log(__dirname);
app.listen(port,()=>{
	console.log('escucha por el puerto' + port);
});
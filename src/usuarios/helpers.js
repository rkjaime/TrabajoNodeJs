const hbs = require('hbs');

hbs.registerHelper('listar',()=>{
	listaUsuarios = require('./usuarios.json');
	let texto = 'lista de usuarios';
	listaUsuarios.forEach(usuario =>{
		texto = 
  usuario.documentoDeIdentidad +
 usuario.nombre + 
 usuario.correo + 
 usuario.telefono 
	})
	return texto;
})

hbs.registerHelper('crear',(documentoDeIdentidad,nombre,correo,telefono)=>{
	console.log(documentoDeIdentidad);
	console.log(nombre);
	console.log(correo);
	console.log(telefono);
	listaUsuarios = require('./funcionesUsuario');
	listaUsuarios.crear(documentoDeIdentidad,nombre,correo,telefono);
});

hbs.registerHelper('crearCurso',(nombre,idCurso,descripcion,valor,modalidad,intensidadHoraria,estado)=>{
	console.log(nombre);
	listaCursos = require('../cursos/funcionesCurso');
	listaCursos.crearCurso(nombre,idCurso,descripcion,valor,modalidad,intensidadHoraria,estado);
});





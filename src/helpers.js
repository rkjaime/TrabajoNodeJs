const hbs = require('hbs');

hbs.registerHelper('listarIncribir',()=>{
	listaEstudiantes = require('./usuariosCursos/CursosUsuarios.json');
	listaEstudiantes = require('./usuariosCursos/CursosUsuarios.json');
	let texto = '';
	listaEstudiantes.forEach(estudiante =>{
		texto = texto + estudiante.nombre + '         ' + estudiante.documentoDeIdentidad + '         ' ;
	})
	return texto;
})

hbs.registerHelper('inscribir',(documento, nombre)=>{
	let texto = '';
		console.log(documento);
		console.log(nombre);
		listaUsuarios = require('./funcionesUsuariosCursos');
		listaUsuarios.crear(documento, nombre);
})
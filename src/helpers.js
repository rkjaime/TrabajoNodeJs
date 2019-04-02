const hbs = require('hbs');

hbs.registerHelper('listarIncribir',()=>{
	listaCursos = require('./usuarios.json');
		let texto = '<table class="table table-striped table-hover">\
		<thead class="thdead-dark">\
		<th>Nombre Estudiante</th>\
		<th>Nombre Curso</th>\
		</thead>\
		<tbody>';
	
		listaCursos.forEach((curso) =>{
			texto = texto +
			'<tr>' + 
			'<td>' + curso.documentoDeIdentidad + '</td>' +
			'<td>' + curso.nombre + '</td>' +
			'<td>' + '< input id="eliminar" type="button " value="'+ curso.nombre+'" /> '+ '</td>'
		});
		texto = texto + '</tr></tbody></table>'
	
		return texto;
	});

hbs.registerHelper('inscribir',(documento, nombre)=>{
	let texto = '';
		console.log(documento);
		console.log(nombre);
		listaUsuarios = require('./funcionesUsuariosCursos');
		listaUsuarios.crear(documento, nombre);
})
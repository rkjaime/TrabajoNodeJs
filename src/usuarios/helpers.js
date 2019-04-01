const hbs = require('hbs');



hbs.registerHelper('crear',(documentoDeIdentidad,nombre,correo,telefono)=>{
	listaUsuarios = require('./funcionesUsuario');
	listaUsuarios.crear(documentoDeIdentidad,nombre,correo,telefono);
});

hbs.registerHelper('crearCurso',(nombre,idCurso,descripcion,valor,modalidad,intensidadHoraria,estado)=>{
	listaCursos = require('../cursos/funcionesCurso');
	listaCursos.crearCurso(nombre,idCurso,descripcion,valor,modalidad,intensidadHoraria,estado);
});

hbs.registerHelper('listarCursosAbiertos',()=>{
	listaUsuarios = require('./usuarios.json');
	let texto = '<table class="table table-striped table-hover">\
	<thead class="thdead-dark">\
	<th>Nombre</th>\
	<th>Id</th>\
	<th>descripcion</th>\
	<th>valor</th>\
	<th>modalidad</th>\
	<th>Intensidad</th>\
	<th>Estado</th>\
	</thead>\
	<tbody>';

	listaCursos.forEach((curso) =>{
		if(curso.estado === 'disponible'){
		texto = texto +
		'<tr>' + 
		'<td>' + curso.nombre + '</td>' +
		'<td>' + curso.idCurso + '</td>' +
		'<td>' + curso.descripcion + '</td>' +
		'<td>' + curso.valor + '</td>' +
		'<td>' + curso.modalidad + '</td>' +
		'<td>' + curso.intensidadHoraria + '</td>' +
		
			'<td>' + curso.estado + '</td>' 
		}

	});
	texto = texto + '</tr></tbody></table>'

	return texto;
});

hbs.registerHelper('listarUsuarios',()=>{
	listaUsuarios = require('./usuarios.json');
	let texto = '<table class="table table-striped table-hover">\
	<thead class="thdead-dark">\
	<th>documentoDeIdentidad</th>\
	<th>Nombre</th>\
	<th>Correo</th>\
	<th>Telefono</th>\
	</thead>\
	<tbody>';

	listaUsuarios.forEach((usuario) =>{
		texto = texto +
		'<tr>' + 
		'<td>' + usuario.documentoDeIdentidad + '</td>' +
		'<td>' + usuario.nombre + '</td>' +
		'<td>' + usuario.correo + '</td>' +
		'<td>' + usuario.telefono + '</td>'
	});
	texto = texto + '</tr></tbody></table>'

	return texto;
});

hbs.registerHelper('listarCursos',()=>{
	listaUsuarios = require('./usuarios.json');
	let texto = '<table class="table table-striped table-hover">\
	<thead class="thdead-dark">\
	<th>Nombre</th>\
	<th>Id</th>\
	<th>descripcion</th>\
	<th>valor</th>\
	<th>modalidad</th>\
	<th>Intensidad</th>\
	<th>Estado</th>\
	</thead>\
	<tbody>';

	listaCursos.forEach((curso) =>{
		texto = texto +
		'<tr>' + 
		'<td>' + curso.nombre + '</td>' +
		'<td>' + curso.idCurso + '</td>' +
		'<td>' + curso.descripcion + '</td>' +
		'<td>' + curso.valor + '</td>' +
		'<td>' + curso.modalidad + '</td>' +
		'<td>' + curso.intensidadHoraria + '</td>' +
		'<td>' + curso.estado + '</td>' 
	});
	texto = texto + '</tr></tbody></table>'

	return texto;
});
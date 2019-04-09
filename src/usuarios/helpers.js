const hbs = require('hbs');



hbs.registerHelper('crear',(documentoDeIdentidad,nombre,correo,telefono)=>{
	listaUsuarios = require('./funcionesUsuario');
	listaUsuarios.crear(documentoDeIdentidad,nombre,correo,telefono);
});

hbs.registerHelper('crearCurso',(nombre,idCurso,descripcion,valor,modalidad,intensidadHoraria,estado)=>{
	listaCursos = require('../cursos/funcionesCurso');
	listaCursos.crearCurso(nombre,idCurso,descripcion,valor,modalidad,intensidadHoraria,estado);
});

hbs.registerHelper('crearUsuarioCurso',(documentoDeIdentidad,nombre,correo,telefono)=>{
	listaUsuarios = require('../usuariosCursos/funcionesUsuariosCursos');
	listaUsuarios.crear(documentoDeIdentidad,nombre,correo,telefono);
});

hbs.registerHelper('listarCursosAbiertos',(listado)=>{
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

	listado.forEach((curso) =>{
		if(curso.estado === 'disponible'){
		texto = texto +
		`<tr>  
		<td>  ${curso.nombre} </td> 
		<td>  ${curso.idCurso} </td> 
		<td>  ${curso.descripcion} </td>
		<td>  ${curso.valor} </td>
		<td>  ${curso.modalidad} </td>
		<td>  ${curso.intensidadHoraria} </td>
		<td>  ${curso.estado} </td>
		</tr>`;
		}
	});

		texto = texto + '</tbody></table>'

	return texto;
});

hbs.registerHelper('listarUsuarios',(listado)=>{
	let texto = '<table class="table table-striped table-hover">\
	<thead class="thdead-dark">\
	<th>documentoDeIdentidad</th>\
	<th>Nombre</th>\
	<th>Correo</th>\
	<th>Telefono</th>\
	</thead>\
	<tbody>';

	listado.forEach((usuario) =>{
		texto = texto +
		`<tr> 
		<td>  ${usuario.documentoDeIdentidad}</td>
		<td> ${usuario.nombre} </td> 
		<td>  ${usuario.correo}  </td> 
		<td>  ${usuario.telefono}  </td>
		</tr>`;
	})
	texto = texto + '</tbody></table>'

	return texto;
});

hbs.registerHelper('listarInscribir',(listado)=>{
	let texto = `'<form action="/eliminarInscrito" method="post">
	<table class="table table-striped table-hover">
	<thead class="thdead-dark">
	<th>documentoDeIdentidad</th>
	<th>Nombre</th>
	<th>Correo</th>
	<th>Telefono</th>
	<th></th>
	</thead>
	<tbody>`;

	listado.forEach((usuario) =>{
		texto = texto +
		`<tr> 
		<td>  ${usuario.documentoDeIdentidad}</td>
		<td> ${usuario.nombre} </td> 
		<td>  ${usuario.correo}  </td> 
		<td>  ${usuario.telefono}  </td>
		<td> <button class="btn btn-danger" name="documentoDeIdentidad" value="${usuario.documentoDeIdentidad}" >Eliminar</button></td>
		</tr>`;
	})
	texto = texto + '</tbody></table>'

	return texto;
});

hbs.registerHelper('listarCursos',(listado)=>{
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

	listado.forEach((curso) =>{
		texto = texto +
		`<tr>  
		<td>  ${curso.nombre} </td> 
		<td>  ${curso.idCurso} </td> 
		<td>  ${curso.descripcion} </td>
		<td>  ${curso.valor} </td>
		<td>  ${curso.modalidad} </td>
		<td>  ${curso.intensidadHoraria} </td>
		<td>  ${curso.estado} </td>
		</tr>`;
	});
		texto = texto + '</tbody></table>'

	return texto;
});



hbs.registerHelper('inscribir',(documento, nombre)=>{
	let texto = '';
		console.log(documento);
		console.log(nombre);
		listaUsuarios = require('../usuariosCursos/funcionesUsuariosCursos');
		listaUsuarios.crear(documento, nombre);
})
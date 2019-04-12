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
	let texto = "<div class='accordion'>";
	//'<table class="table table-striped table-hover">\
	i=1;
	listado.forEach((curso) =>{
		if(curso.estado === 'disponible'){
		texto = texto +
		  `	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

		  <div class="card">
			    <div class="card-header" id="heading${i}">
			      <h5 class="mb-0">
			        <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
			          ${curso.nombre}
			        </button>
			      </h5>
			    </div>

    <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accordion">
      <div class="card-body">
      	id : ${curso.idCurso} <br>
      	descripcion :  ${curso.descripcion} <br>
      	valor : ${curso.valor} <br>
      	modalidad : ${curso.modalidad} <br>
      	intensidadHoraria : ${curso.intensidadHoraria} <br>
      	estado : ${curso.estado} <br>
      </div>
    </div>`
		}
		i=i+1;
	});

		texto = texto + '</div>'

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
	<th>Curso</th>
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

hbs.registerHelper('listarCursosUsuarios',(listado)=>{
	let texto = `'<form action="/eliminarInscrito" method="post">
	<table class="table table-striped table-hover">
	<thead class="thdead-dark">
	<th>documentoDeIdentidad</th>
	<th>Nombre</th>
	<th>Correo</th>
	<th>Curso</th>
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
		<td> <button class="btn btn-info" name="nombre" value="${curso.nombre}}">Mostrar inscritos</button></td>

		</tr>`;
	});
		texto = texto + '</tbody></table>'
	return texto;
});

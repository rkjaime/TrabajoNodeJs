const fs = require ('fs');
listaCursos = [];

const crearCurso = (nombre,idCurso,descripcion,valor,modalidad,intensidadHoraria,estado) => {
	let cur = {
		nombre : nombre,
		idCurso : idCurso,
		descripcion: descripcion,
		valor : valor,
		modalidad:modalidad,
		intensidadHoraria:intensidadHoraria,
		estado:'disponible'
	};
}

let buscarCurso = (id) => {
	return cursos.find( (curso) => curso.id === id);
}

module.exports = {
	crearCurso
}
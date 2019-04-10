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

const crearInscripcion = (insCurso) => {
    let inscribir = {
        documento: insCurso.documento,
        correo: insCurso.correo,
        nombre: insCurso.nombre,
        curso: insCurso.curso,
        idCurso: insCurso.idCurso
    };
    let duplicado = inscripcion.find(nom => nom.idCurso == inscribir.idCurso && nom.documento == inscribir.documento);
    console.log("duplicado");
    console.log(duplicado);
    if (!duplicado) {
        inscripcion.push(inscribir);
        guardarInscrito();
        return 'Inscripcion Exitosa'
    } else {
        return 'Ya se matriculo en este curso';
    }
}

module.exports = {
	crearCurso
}
const fs = require ('fs');
listaCursos = [];

const crearCurso = (curso) => {
	listarCurso();	
	let cur = {
		nombre : curso.nombre,
		idCurso : curso.idCurso,
		descripcion: curso.descripcion,
		valor : curso.valor,
		modalidad:curso.modalidad,
		intensidadHoraria:curso.intensidadHoraria,
		estado:curso.estado
	};
	let duplicado = listaCursos.find(id => id.idCurso == curso.idCurso);
	if(!duplicado){
	listaCursos.push(cur);	
	guardarCurso();
	
	}
else
	console.log('ya existe otro curso con ese id')

}

const listarCurso = () => {
	try{
	listaCursos= require('./cursos.json');
		}
		catch(error){
			listaCursos=[];
		}
}

const guardarCurso = () => {
	let datos = JSON.stringify(listaCursos);
	fs.writeFile('cursos.json',datos,(err)=>{
		if (err) throw (err);
		console.log('curso creado con exito');
	})
}

let buscarCurso = (id) => {
	return cursos.find( (curso) => curso.id === id);
}

module.exports = {
	crearCurso,listarCurso,guardarCurso
}
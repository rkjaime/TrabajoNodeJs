const fs = require ('fs');
listaCursos = [];

const crearCurso = (nombre,idCurso,descripcion,valor,modalidad,intensidadHoraria,estado) => {
	console.log(nombre);
	listarCurso();	
	let cur = {
		nombre : nombre,
		idCurso : idCurso,
		descripcion: descripcion,
		valor : valor,
		modalidad:modalidad,
		intensidadHoraria:intensidadHoraria,
		estado:'disponible'
	};
	let duplicado = listaCursos.find(id => id.idCurso == idCurso);
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
	fs.writeFile('src/cursos/cursos.json',datos,(err)=>{
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
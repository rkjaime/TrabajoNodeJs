const fs = require ('fs');
listaCursos = [];

const crear = (curso) => {
	listar();	
	let cur = {
		nombre : curso.nombre,
		idCurso : curso.idCurso,
		descripcion: curso.descripcion,
		valor : curso.valor,
		modalidad:curso.modalidad,
		intensidadHoraria:curso.intensidadHoraria,
		estado:curso.estado
	};
	let duplicado = listaUsuarios.find(id => id.idCurso == curso.idCurso);
	if(!duplicado){
	listaCursos.push(cur);	
	guardar();
	
	}
else
	console.log('ya existe otro curso con ese id')

}

const listar = () => {
	try{
	listaUsuarios = require('./cursos.json');
		}
		catch(error){
			listaUsuarios=[];
		}
}

const guardar = () => {
	let datos = JSON.stringify(listaCursos);
	fs.writeFile('cursos.json',datos,(err)=>{
		if (err) throw (err);
		console.log('curso creado con exito');
	})
}

module.exports = {
	crear
}
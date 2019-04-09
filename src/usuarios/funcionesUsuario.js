const fs = require ('fs');
listaUsuarios = [];
const {crearCurso,listarCurso,guardarCurso} = require('../cursos/funcionesCurso');
const crear = (documentoDeIdentidad,nombre,correo,telefono,rol) => {	
	let usr = {
		documentoDeIdentidad : documentoDeIdentidad,
		nombre : nombre,
		correo: correo,
		telefono : telefono,
		rol:'aspirante'

	};
}

const listar = () => {
	try{
	listaUsuarios = require('./usuarios.json');
		}
		catch(error){
			listaUsuarios=[];
		}
}

module.exports = {
	crear
}
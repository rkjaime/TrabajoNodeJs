const fs = require ('fs');
listaUsuarios = [];
const {crearCurso,listarCurso,guardarCurso} = require('../cursos/funcionesCurso');
const crear = (documentoDeIdentidad,nombre,correo,telefono,rol) => {
		listar();	
	let usr = {
		documentoDeIdentidad : documentoDeIdentidad,
		nombre : nombre,
		correo: correo,
		telefono : telefono,
		rol:'aspirante'

	};

	let duplicado = listaUsuarios.find(doc => doc.documentoDeIdentidad == documentoDeIdentidad);
	if(!duplicado){
	listaUsuarios.push(usr);	
	guardar();
	
	}
else
	console.log('ya existe otro usuario con esa documentacion')

}

const listar = () => {
	try{
	listaUsuarios = require('./usuarios.json');
		}
		catch(error){
			listaUsuarios=[];
		}
}

const guardar = () => {
	let datos = JSON.stringify(listaUsuarios);
	fs.writeFile('src/usuarios/usuarios.json',datos,(err)=>{
		if (err) throw (err);
		console.log('Usuario creado con exito');
	})
}

module.exports = {
	crear
}
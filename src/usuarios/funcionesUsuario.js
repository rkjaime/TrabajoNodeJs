const fs = require ('fs');
listaUsuarios = [];

const crear = (documentoDeIdentidad,nombre,correo,telefono,rol) => {
	console.log(nombre);
		listar();	
	let usr = {
		documentoDeIdentidad : documentoDeIdentidad,
		nombre : nombre,
		correo: correo,
		telefono : telefono,
		rol:rol

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
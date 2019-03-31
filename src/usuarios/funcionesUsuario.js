const fs = require ('fs');
listaUsuarios = [];

const crear = (usuario) => {
		listar();	
	let usr = {
		documentoDeIdentidad : usuario.documentoDeIdentidad,
		nombre : usuario.nombre,
		correo: usuario.correo,
		telefono : usuario.telefono,
		rol:usuario.rol
	};
	let duplicado = listaUsuarios.find(doc => doc.documentoDeIdentidad == usuario.documentoDeIdentidad);
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
	fs.writeFile('usuarios.json',datos,(err)=>{
		if (err) throw (err);
		console.log('Usuario creado con exito');
	})
}

module.exports = {
	crear
}
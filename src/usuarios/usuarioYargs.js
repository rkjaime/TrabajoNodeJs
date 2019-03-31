const documentoDeIdentidad ={
	demand : true,
	alias : 'd'
}

const nombre ={
	demand : true,
	alias : 'n'
}

const correo ={
	demand : true,
	alias : 'c'
}

const telefono ={
	demand : true,
	alias : 't'
}

const rol ={
	demand : true,
	alias : 'r',
	default: 'aspirante'
}

const creacion = {
	documentoDeIdentidad,
	nombre,
	correo,
	telefono,
	rol
}

const argv = require('yargs')
		 	 .command('crear', 'crear un usuario',creacion)
		 	 .argv;

module.exports = {
	argv
};

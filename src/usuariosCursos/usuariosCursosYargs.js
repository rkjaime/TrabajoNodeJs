const documentoDeIdentidad={
	demand : true,
	alias: 'd'
}

const nombre ={
	demand : true,
	alias: 'n'
}


const creacion = {
	documentoDeIdentidad,
	nombre
}

const argv = require('yargs')
		 	 .command('crear', 'crea un relacion de curso y estudiante',creacion)
		 	 .argv;

module.exports = {
	argv
};

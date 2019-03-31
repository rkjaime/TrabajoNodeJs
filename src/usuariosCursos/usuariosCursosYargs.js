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
const eliminar = {
	nombre
}
const listar = {
}

const argv = require('yargs')
		 	.command('inscribir', 'crea un relacion de curso y estudiante',creacion)
            .command('eliminar', 'crea un relacion de curso y estudiante', eliminar)
            .command('listar', 'crea un relacion de curso y estudiante', listar)
              .argv;

module.exports = {
	argv
};
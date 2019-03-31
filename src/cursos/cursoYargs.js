const nombre={
	demand : true,
	alias : 'n'
}

const idCurso ={
	demand : true,
	alias : 'i'
}

const descripcion ={
	demand : true,
	alias : 'd'
}

const valor ={
	demand : true,
	alias : 'v'
}

const modalidad ={
	demand : false,
	alias : 'm'
}

const intensidadHoraria ={
	demand : false,
	alias : 'h'

}

const estado = {
	demand : false,
	alias : 'e',
	default : 'disponible'

}

const creacion = {
	nombre,
	idCurso,
	descripcion,
	valor,
	modalidad,
	intensidadHoraria,
	estado
}

const argv = require('yargs')
		 	 .command('crear', 'crear un curso',creacion)
		 	 .argv;

module.exports = {
	argv
};

const {argv} = require('./usuariosCursosYargs');
const funciones = require ('./funcionesUsuariosCursos');

let comando = argv._[0];

if(argv._[0]=='inscribir'){
	funciones.crear(argv);
}
if(argv._[0]=='eliminar'){
	funciones.eliminar(argv);
}
if(argv._[0]=='verInscritos'){
	funciones.listar();
}

const {argv} = require('./usuarioYargs');
const funciones = require ('./funcionesUsuario');

let comando = argv._[0];

if(argv._[0]=='crear'){
	funciones.crear(argv);
}
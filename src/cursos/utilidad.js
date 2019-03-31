const {argv} = require('./cursoYargs');
const funciones = require ('./funcionesCurso');

let comando = argv._[0];

if(argv._[0]=='crear'){
	funciones.crearCurso(argv);
}
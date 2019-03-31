const fs = require ('fs');
listaEstudiantes = [];

const crear = (estudiante) => {
	listar();
	let est = {
		nombre : estudiante.nombre,
		matematicas : estudiante.matematicas,
		ingles: estudiante.ingles,
		programacion : estudiante.programacion
	};
	let duplicado = listaEstudiantes.find(nom => nom.nombre == estudiante.nombre);
	if(!duplicado){
	listaEstudiantes.push(est);
	console.log(listaEstudiantes);
	guardar();		
	}
else
	console.log('ya existe otro estudiante con ese nombre')

}

const listar = () => {
	try{
	listaEstudiantes = require('./listado.json');
	//listaEstudiantes = JSON.parse(fs.readFileSync('listado.json'));
		}
		catch(error){
			listaEstudiantes=[];
		}
}

const guardar = () => {
	let datos = JSON.stringify(listaEstudiantes);
	fs.writeFile('listado.json',datos,(err)=>{
		if (err) throw (err);
		console.log('archivo creado con exito');
	})
}

module.exports = {
	crear
}
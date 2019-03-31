const fs = require ('fs');
listaCursosUsuarios = [];
listaCursos = [];

listaCursos = require ('../cursos/cursos.json');
listaUsuarios = require('../usuarios/usuarios.json');

const crear = (cursoUsuario) => {
	listar();	
	let curU = {
		documentoDeIdentidad : cursoUsuario.documentoDeIdentidad,
		idCurso : cursoUsuario.idCurso
	};
    let idCurso = listaCursosUsuarios.find(id => id.idCurso == cursoUsuario.idCurso);
    let ced = listaCursosUsuarios.find(cod => cod.idCurso == cursoUsuario.documentoDeIdentidad);
   
    let curso = listaCursos.find(nom =>nom.nombre == cursoUsuario.nombre);
    let usuario = listaUsuarios.find(ced => ced.documentoDeIdentidad == cursoUsuario.documentoDeIdentidad);
   
    if(!usuario){
        console.log('No estas registrado aun en la plataforma');
    }else{
        if(!curso)
        {
            console.log('El curso no existe');   
        }else{
            if(!idCurso && !ced ){
                listaCursosUsuarios.push(curU);	
                guardar();
                
            }
            else{
                console.log('ya estas matriculado en este curso');
            } 
        }
       
    }
}   
const listar = () => {
	try{
        listaCursosUsuarios = require('./cursosUsuarios.json');
		}
		catch(error){
			listaCursosUsuarios=[];
		}
}

const guardar = () => {
	let datos = JSON.stringify(listaCursosUsuarios);
	fs.writeFile('CursosUsuarios.json',datos,(err)=>{
		if (err) throw (err);
		console.log('Inscripcion exitosa');
	})
}

module.exports = {
	crear
}
const fs = require ('fs');
listaCursosUsuarios = [];
listaCursos = [];

//listaCursosUsuarios = require ('./CursosUsuarios.json');
listaCursos = require ('../cursos/cursos.json');
listaUsuarios = require('../usuarios/usuarios.json');

const crear = (cursoUsuario) => {
	listar();	
	let curU = {
		documentoDeIdentidad : cursoUsuario.documentoDeIdentidad,
		nombre : cursoUsuario.nombre
    };
    let nombre = listaCursosUsuarios.find(id=> id.nombre == cursoUsuario.nombre);
    
    let ced = listaCursosUsuarios.find(cod => cod.documentoDeIdentidad == cursoUsuario.documentoDeIdentidad);
   
    let curso = listaCursos.find(nom =>nom.nombre == cursoUsuario.nombre);
    let usuario = listaUsuarios.find(ced => ced.documentoDeIdentidad == cursoUsuario.documentoDeIdentidad);
   
    if(!usuario){
        console.log('No estas registrado aun en la plataforma');
    }else{
        if(!curso)
        {
            console.log('El curso no existe');   
        }else{
            if(!nombre && !ced ){
                listaCursosUsuarios.push(curU);	
                guardar();
                
            }
            else{
                console.log('ya estas matriculado en este curso');
            } 
        }
       
    }
}   
const eliminar = (nom) =>{
    listar();
    let nombre = listaCursosUsuarios.find(id=> id.nombre == nom);
    let nuevo = listaCursosUsuarios.filter(nomb => nomb.nombre == nom);
    
    if(nuevo.length == listaCursosUsuarios.length){
        console.log("no tienes ningun curso con este nombre");
    }else{
        listaCursosUsuarios = nuevo
        console.log("se elimino con exito");
        guardar();
    }
}

const listar = () => {
	try{
        console.log("Cursos");
        listaCursosUsuarios = require('./CursosUsuarios.json');
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
    crear, 
    eliminar,
    listar
}
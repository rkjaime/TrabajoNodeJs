const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const directoriopublico = path.join(__dirname,'../public' );
const directoriopartials = path.join(__dirname,'../partials' );
app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);
app.set('view engine','hbs');
app.get('/',(req,res) =>{
	res.render('index',{
		estudiante:'sebastian'});
});
path.join(__dirname,'../public' );
app.get('/calculos',(req,res)=>{
	res.render('calculos',{
		estudiante:'Juliana'
	});
});
//app.use(express.static(__dirname + '/public'))
console.log(__dirname);
app.listen(4000,()=>{
	console.log('escucha por el puerto');
});
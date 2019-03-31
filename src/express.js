const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser')
require('./helpers');
const directoriopublico = path.join(__dirname,'../public' );
const directoriopartials = path.join(__dirname,'../partials' );
app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);

app.use(bodyParser.urlencode({extended:false}))
app.set('view engine','hbs');
app.get('/',(req,res) =>{
	res.render('index',{
		estudiante:'sebastian'});
});
path.join(__dirname,'../public' );

app.get('/calculos',(req,res)=>{
	console.log(req.query);
	res.render('calculos',{
		estudiante:req.body.nombre,
		nota1:parseInt(req.query.nota1),
		nota2:parseInt(req.query.nota2)
	});
});

app.get('*',(req,res)=>{
	res.render('error',{
		estudiante :'error'
	})
})
//app.use(express.static(__dirname + '/public'))
console.log(__dirname);
app.listen(4000,()=>{
	console.log('escucha por el puerto');
});
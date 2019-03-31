const express = require('express');
const app = express();
const path = require('path');
const directoriopublico = path.join(__dirname,'../public' );
app.use(express.static(directoriopublico));
//app.use(express.static(__dirname + '/public'))
console.log(__dirname);
app.listen(4000,()=>{
	console.log('escucha por el puerto');
});
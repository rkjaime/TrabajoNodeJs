const hbs = require('hbs');

hbs.registerHelper('hola', (nota1, nota2) =>{
	return (nota1 + nota2)/2
})
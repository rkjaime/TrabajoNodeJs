const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
var uniqueValidator = require('mongoose-unique-validator');
const encuestaSchema = new Schema({
	nombre:{
		type : String,
		require: true
	},
	idCurso :{
		type: String,
		require: true,
	},
	pregunta3:{
		type:String,
		require: true
	},
	pregunta4:{
		type:String,
		require: true
	},
	pregunta5:{
		type:String,
		require: true
	},
	pregunta6:{
		type:String,
		require: true
	},
	pregunta7:{
		type:String,
		require: true
	}
});
encuestaSchema.plugin(uniqueValidator);
const Encuesta = mongoose.model('Encuesta',encuestaSchema);

module.exports =Encuesta
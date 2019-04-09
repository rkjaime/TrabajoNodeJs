const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
var uniqueValidator = require('mongoose-unique-validator');
const estudianteSchema = new Schema({
	documentoDeIdentidad:{
		type : Number,
		require: true,
		unique: true
	},
	nombre :{
		type: String,
		require: true,
		trim: true
	},
	correo:{
		type:String,
		require: true,
		trim: true
	},
	telefono:{
		type:String,
		require: true,
		trim: true
	},
	rol:{
		type:String,
		default: 'aspirante'
	}
});

estudianteSchema.plugin(uniqueValidator);
const Estudiante = mongoose.model('Estudiante',estudianteSchema);

module.exports = Estudiante
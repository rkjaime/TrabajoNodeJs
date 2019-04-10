const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
var uniqueValidator = require('mongoose-unique-validator');
const estudianteSchema = new Schema({
	documentoDeIdentidad:{
		type : Number,
		require: [true, 'ingrese el documentoDeIdentidad'],
		unique: [true, "ya existe el documentoDeIdentidad"]
	},
	nombre :{
		type: String,
		require: [true, 'ingrese el nombre'],
		trim: true
	},
	correo:{
		type:String,
		require: [true, 'ingrese el correo'],
		trim: true
	},
	telefono:{
		type:String,
		require: [true, 'ingrese el telefono'],
		trim: true
	},
	rol:{
		type:String,
		default: 'aspirante'
	}
});

estudianteSchema.plugin(uniqueValidator,{message: '{PATH} must be unique'});
const Estudiante = mongoose.model('Estudiante',estudianteSchema);

module.exports = Estudiante
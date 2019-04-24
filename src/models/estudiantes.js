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
	},
	correo:{
		type:String,
		require: [true, 'ingrese el correo'],
		trim: true
	},
	telefono:{
		type:String,
		require: [true, 'ingrese el telefono'],
	},
	rol:{
		type:String,
		default: 'aspirante',
        trim: true,
        enum: { values: ['aspirante', 'coordinador'] }
	}
});

estudianteSchema.plugin(uniqueValidator);
const Estudiante = mongoose.model('Estudiante',estudianteSchema);

module.exports = Estudiante
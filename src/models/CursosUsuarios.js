const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
var uniqueValidator = require('mongoose-unique-validator');
const aspiranteSchema = new Schema({
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
	}
});
aspiranteSchema.plugin(uniqueValidator);
const Aspirante = mongoose.model('Aspirante',aspiranteSchema);

module.exports = Aspirante
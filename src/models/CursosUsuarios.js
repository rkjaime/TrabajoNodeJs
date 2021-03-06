const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
var uniqueValidator = require('mongoose-unique-validator');
const aspiranteSchema = new Schema({
	documentoDeIdentidad:{
		type : Number,
		require: true,
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
	datos:{
		type:Buffer
	},
	telefono:{
		type:String,
		require: true,
		trim: true,
	}
});
aspiranteSchema.plugin(uniqueValidator);
const Aspirante = mongoose.model('Aspirante',aspiranteSchema);

module.exports = Aspirante
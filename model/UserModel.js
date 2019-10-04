const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create user schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		requird: true,
		min: 3
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

//export module
module.exports = mongoose.model('User', UserSchema);

const Joi = require('@hapi/joi');

//create Registration validator function
const registrationValidartor = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(30).required(),
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: [ 'com', 'net' ] } }),
		password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/)
	});
	return schema.validate(data);
};
//create Login validator function
const loginValidartor = (data) => {
	const schema = Joi.object({
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: [ 'com', 'net' ] } }),
		password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/)
	});
	return schema.validate(data);
};
//export validation function
module.exports.registrationValidartor = registrationValidartor;
module.exports.loginValidartor = loginValidartor;

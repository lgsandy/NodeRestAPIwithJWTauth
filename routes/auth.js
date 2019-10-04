const UserModel = require('../model/UserModel');
const express = require('express');
const router = express.Router();
//import validator
const { registrationValidartor, loginValidartor } = require('../validation');
//import bcrypt for password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;
//import jwt for authencation
const jwt = require('jsonwebtoken');

//register user
router.post('/register', (req, res) => {
	//Check for Validation Error
	const { error } = registrationValidartor(req.body);
	if (error) return res.send(error.details[0].message);

	//check user is already available or not
	UserModel.findOne({ email: req.body.email }).then((result) => {
		//if available
		if (result) return res.status(400).send(`User already register with ${req.body.email} `);
		//if not available
		//decrepet ths password
		bcrypt.hash(req.body.password, saltRounds).then((hash) => {
			// Store hash in your password DB.
			const nweUser = new UserModel({
				name: req.body.name,
				email: req.body.email,
				password: hash
			});
			//savs user to databaes
			nweUser
				.save()
				.then((createdUser) => {
					res.send(createdUser);
				})
				.catch((err) => {
					res.send(err);
				});
		});
	});
});

//Login user
router.post('/login', (req, res) => {
	//Check for Validation Error
	const { error } = loginValidartor(req.body);
	if (error) return res.send(error.details[0].message);
	//find user by email
	UserModel.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) return res.status(400).send('Invalid Email');
			//compare password
			if (bcrypt.compareSync(req.body.password, user.password)) {
				//create token and send that token to clint as heder
				const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
				//set this token to header
				res.header('auth-token', token).send(token);
			} else {
				res.send('Password Incorrect');
			}
		})
		.catch((err) => {
			res.send(err);
		});
});
//export module
module.exports = router;

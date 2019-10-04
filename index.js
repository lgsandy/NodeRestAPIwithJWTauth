const postRoute = require('./routes/post');
const AuthRoute = require('./routes/auth');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
//to read .env data
const dotenv = require('dotenv');
dotenv.config();
//create connection to database
mongoose
	.connect(process.env.DB_CONNECT, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then((result) => {
		console.log('Connection Successfull');
	})
	.catch((err) => {
		console.log(err);
	});

//middlewares
app.use(express.json());

//Middleware
app.use('/api/users', AuthRoute);
//configure post route
app.use('/api/posts', postRoute);

//start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server started on potr:${port}`);
});
